import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const accessTokenAtom = atomWithStorage<string>('accessToken', '');
const refreshTokenAtom = atomWithStorage<string>('refreshToken', '');

const setAccessTokenAtom = atom(null, (get, set, accessToken: string) => {
  set(accessTokenAtom, accessToken);
});

const setRefreshTokenAtom = atom(null, (get, set, refreshToken: string) => {
  set(refreshTokenAtom, refreshToken);
});

const clearTokenAtom = atom(null, (get, set) => {
  set(accessTokenAtom, '');
  set(refreshTokenAtom, '');
});

const getTokenState = () => {
  if (typeof window === 'undefined') {
    return { accessToken: '', refreshToken: '' };
  }
  return {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  };
};

export {
  accessTokenAtom,
  refreshTokenAtom,
  setAccessTokenAtom,
  setRefreshTokenAtom,
  clearTokenAtom,
  getTokenState,
};
