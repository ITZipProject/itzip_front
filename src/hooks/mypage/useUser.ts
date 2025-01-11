'use client';

import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { getUser, checkNickname, editNickname, editPassword } from '@/api/mypage/mypage.action';
import { mypageFormLoadingAtom } from '@/atoms/formAtoms';

interface UserProps {
  email: string;
  nickname: string;
  imageUrl?: string | null;
}

export default function useUser() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setLoading] = useAtom(mypageFormLoadingAtom);

  // 유저 정보 조회
  const fetchUser = useCallback(async () => {
    setLoading((prev) => ({ ...prev, userStateLoading: true }));
    try {
      const res = await getUser();
      setUser(res.data);
    } catch (err) {
      console.error('fetchUser error : ', err);
      toast.error('유저 정보를 가져오는 데 실패했습니다. 다시 로그인 해주세요.');
    } finally {
      setLoading((prev) => ({ ...prev, userStateLoading: false }));
    }
  }, [setLoading]);

  // 닉네임 중복 체크
  const checkUserNickname = async (nickname: string) => {
    setLoading((prev) => ({ ...prev, nicknameCheck: true }));
    try {
      await checkNickname(nickname);
      toast.success('사용 가능한 닉네임입니다');
      return true;
    } catch (err) {
      console.error(err);
      toast.error('사용할 수 없는 닉네임입니다');
      return false;
    } finally {
      setLoading((prev) => ({ ...prev, nicknameCheck: false }));
    }
  };

  // 닉네임 수정
  const updateNickname = async (nickname: string) => {
    setLoading((prev) => ({ ...prev, nicknameUpdate: true }));
    try {
      await editNickname(nickname);
      toast.success('닉네임이 변경되었습니다');
      await fetchUser();
      return true;
    } catch (err) {
      console.error(err);
      toast.error('닉네임 변경에 실패했습니다');
      return false;
    } finally {
      setLoading((prev) => ({ ...prev, nicknameUpdate: false }));
    }
  };

  // 비밀번호 수정
  const updatePassword = async (password: string) => {
    setLoading((prev) => ({ ...prev, passwordUpdate: true }));
    try {
      await editPassword(password);
      toast.success('비밀번호가 변경되었습니다');
      return true;
    } catch (err) {
      console.error(err);
      toast.error('비밀번호 변경에 실패했습니다');
      return false;
    } finally {
      setLoading((prev) => ({ ...prev, passwordUpdate: false }));
    }
  };

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  return {
    user,
    isLoading,
    checkUserNickname,
    updateNickname,
    updatePassword,
    refreshUser: fetchUser,
  };
}
