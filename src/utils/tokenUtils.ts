'use client';
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
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: name === 'accessToken' ? 1 / 24 : 7, // accessToken은 1시간, refreshToken은 7일
  });
};

// 토큰 삭제 함수
export const removeTokenCookie = (name: string) => {
  Cookies.remove(name, { path: '/' }); // 경로 지정하여 삭제
};

// 토큰 초기화 함수
export const clearTokens = () => {
  removeTokenCookie('accessToken');
  removeTokenCookie('refreshToken');
};
