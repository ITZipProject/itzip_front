'use client';

import axios from 'axios';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useModal } from '@/lib/context/ModalContext';
import { accessTokenAtom, clearTokenAtom } from '@/store/useTokenStore';

import { logoutServerAction } from './actions';

interface UserProps {
  email: string;
  nickname: string;
  imageUrl?: string | null;
}

export default function Profile() {
  const [loading, setLoading] = useState({
    user: false,
    logout: false,
    goodbye: false,
  });
  const router = useRouter();
  const [, clearTokens] = useAtom(clearTokenAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const { openModal } = useModal();
  const [user, setUser] = useState<UserProps>();

  const logOut = async () => {
    setLoading((prev) => ({ ...prev, logout: true }));

    try {
      await logoutServerAction();
      clearTokens();

      // 로그아웃 실패 로그 보려면 주석
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      setLoading((prev) => ({ ...prev, logout: false }));
    }
  };

  const getUser = useCallback(async () => {
    setLoading((prev) => ({ ...prev, user: true }));
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUser((res?.data as { data: UserProps })?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, user: false }));
    }
  }, [accessToken]);

  useEffect(() => {
    void getUser();
  }, [getUser]);

  // api - 미구현
  const out = () => {};

  return (
    <div className="flex h-screen flex-col bg-[#F9FBFC] p-4">
      <div className="rounded-lg border-2 border-Blue-500 px-spacing-05 py-spacing-06">
        <div className="flex items-center justify-between pb-2">
          <div className="flex gap-4">
            {user?.imageUrl ? (
              <Image src={user.imageUrl} alt="profileImage" />
            ) : (
              <div className="size-16 rounded-full bg-slate-400" />
            )}
            <div className="flex flex-col justify-center">
              <span className="font-semibold">{user?.nickname}</span>
              <span className="text-12 text-[#A3A3A3]">{user?.email}</span>
            </div>
          </div>
          <div>
            <button
              onClick={() => openModal('editProfileModal')}
              className="rounded-md border p-2 text-12 font-normal text-Grey-300 hover:border-Blue-500 hover:text-Blue-400"
            >
              프로필 수정
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <button onClick={() => void logOut()} disabled={loading.logout}>
          {loading.logout ? '로그아웃 중...' : '로그아웃'}
        </button>
        <button className="text-gray-300" onClick={out} disabled={loading.goodbye}>
          {loading.goodbye ? '회원탈퇴 중...' : '회원탈퇴 >'}
        </button>
      </div>
      <div></div>
    </div>
  );
}
