'use server';
import { cookies } from 'next/headers';

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

// 서버용 토큰 가져오기
export const getServerToken = (): TokenState => {
  const cookieStore = cookies();
  return {
    accessToken: cookieStore.get('accessToken')?.value || null,
    refreshToken: cookieStore.get('refreshToken')?.value || null,
  };
};
