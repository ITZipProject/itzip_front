import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);
const refreshTokenAtom = atomWithStorage<string | null>('refreshToken', null);

const setCookie = (name: string, value: string, maxAge?: number) => {
  document.cookie = `${name}=${value}; path=/; ${maxAge ? `max-age=${maxAge};` : ''}samesite=strict`;
};

const setAccessTokenAtom = atom(null, (get, set, accessToken: string) => {
  set(accessTokenAtom, accessToken);
  setCookie('accessToken', accessToken, 3600);
});

const setRefreshTokenAtom = atom(null, (get, set, refreshToken: string) => {
  set(refreshTokenAtom, refreshToken);
  setCookie('refreshToken', refreshToken, 2 * 7 * 24 * 3600);
});

const clearTokenAtom = atom(null, (get, set) => {
  // atom 초기화
  set(accessTokenAtom, null);
  set(refreshTokenAtom, null);

  // localStorage 직접 제거
  if (typeof window !== 'undefined') {
    localStorage.clear(); // 모든 항목 제거
    // 또는
    localStorage.removeItem('accessToken'); // jotai가 사용하는 실제 키
    localStorage.removeItem('refreshToken');
  }

  // 쿠키 제거
  setCookie('accessToken', '', 0);
  setCookie('refreshToken', '', 0);
});

const getTokenState = () => {
  // SSR 대응
  if (typeof window === 'undefined') {
    return { accessToken: '', refreshToken: '' };
  }

  const cookies = document.cookie.split(';').reduce(
    (acc, curr) => {
      const [key, value] = curr.trim().split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const accessToken = cookies.accessToken || '';
  const refreshToken = cookies.refreshToken || '';

  return {
    accessToken,
    refreshToken,
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
