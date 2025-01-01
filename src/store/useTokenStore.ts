'use client';

import { clearTokens, getToken, setTokenCookie, TokenState } from '@/utils/tokenUtils';
import { atom } from 'jotai';

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
  clearTokens();
  set(tokenAtom, { accessToken: null, refreshToken: null });
});

export { tokenAtom, setAccessTokenAtom, setRefreshTokenAtom, clearTokenAtom };
