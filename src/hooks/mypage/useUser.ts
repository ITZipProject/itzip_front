'use client';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { getUser, checkNickname, editNickname, editPassword } from '@/api/mypage/mypage.action';
import { loadingAtom } from '@/atoms/formAtoms';

interface UserProps {
  email: string;
  nickname: string;
  imageUrl?: string | null;
}

export default function useUser(token: string) {
  const [user, setUser] = useState<UserProps>();
  const [, setLoading] = useAtom(loadingAtom);
  const [isLoading, setIsLoading] = useState(false);

  // 유저 정보 조회
  const fetchUser = useCallback(async () => {
    setLoading((prev) => ({ ...prev, user: true }));
    try {
      const res = await getUser(token);
      setUser(res.data);
    } catch (err) {
      console.error('fetchUser error : ', err);
    } finally {
      setLoading((prev) => ({ ...prev, user: false }));
    }
  }, [token, setLoading]);

  // 닉네임 중복 체크
  const checkUserNickname = async (nickname: string) => {
    setIsLoading(true);
    try {
      await checkNickname(nickname, token);
      toast.success('사용 가능한 닉네임입니다');
      return true;
    } catch (err) {
      console.error(err);
      toast.error('사용할 수 없는 닉네임입니다');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 닉네임 수정
  const updateNickname = async (nickname: string) => {
    setIsLoading(true);
    try {
      await editNickname(nickname, token);
      toast.success('닉네임이 변경되었습니다');
      await fetchUser(); // 유저 정보 갱신
      return true;
    } catch (err) {
      console.error(err);
      toast.error('닉네임 변경에 실패했습니다');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 수정
  const updatePassword = async (password: string) => {
    setIsLoading(true);
    try {
      await editPassword(password, token);
      toast.success('비밀번호가 변경되었습니다');
      return true;
    } catch (err) {
      console.error(err);
      toast.error('비밀번호 변경에 실패했습니다');
      return false;
    } finally {
      setIsLoading(false);
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
