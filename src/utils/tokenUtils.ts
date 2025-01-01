// tokenUtils.ts
import Cookies from 'js-cookie';

export interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

// 초기 토큰 값을 쿠키에서 가져오는 함수
export const getToken = (): TokenState => {
  return {
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
  };
};

// 토큰 쿠키 관리 함수
export const setTokenCookie = (name: string, value: string) => {
  Cookies.set(name, value, {
    expires: 7, // 7일
    secure: true,
    sameSite: 'strict',
  });
};

export const removeTokenCookie = (name: string) => {
  Cookies.remove(name);
};

// 토큰 초기화 함수
export const clearTokens = () => {
  removeTokenCookie('accessToken');
  removeTokenCookie('refreshToken');
};
