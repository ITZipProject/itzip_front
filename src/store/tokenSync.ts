'use client';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

import { setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore';

const TokenSync: React.FC = () => {
  const [, setAccessToken] = useAtom(setAccessTokenAtom);
  const [, setRefreshToken] = useAtom(setRefreshTokenAtom);

  useEffect(() => {
    // 쿠키에서 토큰 값을 읽어 상태에 설정
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  }, [setAccessToken, setRefreshToken]);

  return null; // UI는 필요 없으므로 null 반환
};

export default TokenSync;
