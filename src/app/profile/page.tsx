'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';

import { loadingAtom } from '@/atoms/formAtoms';
import useUser from '@/hooks/mypage/useUser';
import { useModal } from '@/lib/context/ModalContext';
import { accessTokenAtom } from '@/store/useTokenStore';

export default function Profile() {
  const [accessToken] = useAtom(accessTokenAtom);
  const { openModal } = useModal();
  const { user, userLogout } = useUser(accessToken ?? '');
  const [loading] = useAtom(loadingAtom);
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
        <button onClick={() => void userLogout()} disabled={loading.logout}>
          {loading.logout ? '로그아웃 중...' : '로그아웃'}
        </button>
        <button className="text-gray-300" onClick={() => {}} disabled={loading.userOut}>
          {loading.userOut ? '회원탈퇴 중...' : '회원탈퇴 >'}
        </button>
      </div>
      <div></div>
    </div>
  );
}
