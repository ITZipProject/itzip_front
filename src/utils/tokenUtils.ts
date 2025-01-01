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
export const setTokenCookie = (name: string, value: string, expiresDays: number = 7) => {
  Cookies.set(name, value, {
    expires: expiresDays, // 기본 7일, 필요시 다른 값으로 설정
    secure: typeof window !== 'undefined' && window.location.protocol === 'https:', // HTTPS에서만 secure 쿠키 설정
    sameSite: 'strict',
    path: '/', // 쿠키 경로 설정 (전체 경로에서 유효)
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
