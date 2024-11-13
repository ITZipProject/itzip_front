import { useAtom } from 'jotai';
import { useState } from 'react';

import { logout } from '@/api/auth/authServer.action';
import { loadingAtom } from '@/atoms/formAtoms';
import { clearTokenAtom } from '@/store/useTokenStore';

interface UserProps {
  email: string;
  nickname: string;
  imageUrl?: string | null;
}

const useUser = () => {
  const [user, setUser] = useState<UserProps>();
  const [_, setLoading] = useAtom(loadingAtom);
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

  return {
    user,
    userLogout,
  };
};

export default useUser;
