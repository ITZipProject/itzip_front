'use client';
import { atom } from 'jotai';
import Cookies from 'js-cookie';

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

// 토큰 가져오기 함수
const getToken = (): TokenState => {
  return {
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
  };
};

// 토큰 쿠키 관리 함수
const setTokenCookie = (name: string, value: string) => {
  Cookies.set(name, value, {
    expires: 7, // 7일
    secure: true,
    sameSite: 'strict',
  });
};

const removeTokenCookie = (name: string) => {
  Cookies.remove(name);
};

// 토큰 상태 atom
const tokenAtom = atom<TokenState>(getToken());

// 토큰 설정 atoms
const setAccessTokenAtom = atom(null, (get, set, accessToken: string) => {
  setTokenCookie('accessToken', accessToken);
  const currentState = get(tokenAtom);
  set(tokenAtom, { ...currentState, accessToken });
});

const setRefreshTokenAtom = atom(null, (get, set, refreshToken: string) => {
  setTokenCookie('refreshToken', refreshToken);
  const currentState = get(tokenAtom);
  set(tokenAtom, { ...currentState, refreshToken });
});

// 토큰 초기화 atom
const clearTokenAtom = atom(null, (_get, set) => {
  removeTokenCookie('accessToken');
  removeTokenCookie('refreshToken');
  set(tokenAtom, { accessToken: null, refreshToken: null });
});

export { tokenAtom, setAccessTokenAtom, setRefreshTokenAtom, clearTokenAtom, getToken };
