'use client';

import { clearTokens, getToken, setTokenCookie, TokenState } from '@/utils/tokenUtils';
import { atom } from 'jotai';
import Cookies from 'js-cookie';

// 초기 토큰 상태 atom
const tokenAtom = atom<TokenState>(getToken());

// 토큰 설정 atom: 액세스 토큰 설정
const setAccessTokenAtom = atom(null, (get, set, accessToken: string | null) => {
  // 액세스 토큰이 있을 경우 쿠키에 저장, 없으면 쿠키에서 삭제
  if (accessToken) {
    setTokenCookie('accessToken', accessToken);
  } else {
    Cookies.remove('accessToken', { path: '/' });
  }
  const currentState = get(tokenAtom);
  set(tokenAtom, { ...currentState, accessToken });
});

// 토큰 설정 atom: 리프레시 토큰 설정
const setRefreshTokenAtom = atom(null, (get, set, refreshToken: string | null) => {
  // 리프레시 토큰이 있을 경우 쿠키에 저장, 없으면 쿠키에서 삭제
  if (refreshToken) {
    setTokenCookie('refreshToken', refreshToken);
  } else {
    Cookies.remove('refreshToken', { path: '/' });
  }
  const currentState = get(tokenAtom);
  set(tokenAtom, { ...currentState, refreshToken });
});

// 토큰 초기화 atom: 쿠키와 상태 모두 초기화
const clearTokenAtom = atom(null, (_get, set) => {
  clearTokens(); // 쿠키에서 토큰 제거
  set(tokenAtom, { accessToken: null, refreshToken: null }); // 상태도 초기화
});

export { tokenAtom, setAccessTokenAtom, setRefreshTokenAtom, clearTokenAtom };
