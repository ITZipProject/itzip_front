'use client';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import { logout } from '@/api/auth/authServer.action';
import { getUser } from '@/api/mypage/mypage.action';
import { loadingAtom } from '@/atoms/formAtoms';
import { clearTokenAtom } from '@/store/useTokenStore';

interface UserProps {
  email: string;
  nickname: string;
  imageUrl?: string | null;
}

interface ApiResponse {
  data: {
    data: UserProps;
  };
}

const useUser = (accessToken: string) => {
  const [user, setUser] = useState<UserProps>();
  const [, setLoading] = useAtom(loadingAtom);
  const [, clearToken] = useAtom(clearTokenAtom);
  const userLogout = async () => {
    setLoading((prev) => ({ ...prev, logout: true }));
    try {
      await logout();
      clearToken;
      localStorage.clear();
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, logout: false }));
    }
  };
  const fetchUser = useCallback(async () => {
    setLoading((prev) => ({ ...prev, user: true }));
    try {
      const res = (await getUser(accessToken)) as ApiResponse;
      const userData: UserProps = {
        ...res.data.data,
      };
      setUser(userData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => ({ ...prev, user: false }));
    }
  }, [accessToken, setLoading]);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  return {
    user,
    userLogout,
  };
};

export default useUser;
