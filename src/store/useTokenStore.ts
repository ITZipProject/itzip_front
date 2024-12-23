import { atom } from 'jotai';

interface CookieOptions {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  domain?: string;
}

// 쿠키 설정 함수
const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
  try {
    const { maxAge, path = '/', secure = true, sameSite = 'strict', domain } = options;

    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (path) cookieString += `; path=${path}`;
    if (maxAge) cookieString += `; max-age=${maxAge}`;
    if (secure) cookieString += '; secure';
    if (sameSite) cookieString += `; samesite=${sameSite}`;
    if (domain) cookieString += `; domain=${domain}`;
    document.cookie = cookieString;

    return true;
  } catch (error) {
    console.error(`Error setting cookie '${name}':`, error);
    return false;
  }
};

// 쿠키 가져오기 함수
const getCookie = (name: string): string => {
  if (typeof window === 'undefined') return '';

  try {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));

    if (match) {
      return decodeURIComponent(match[2]);
    }
    return '';
  } catch (error) {
    console.error(`Error getting cookie '${name}':`, error);
    return '';
  }
};

// 쿠키 삭제 함수
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; samesite=strict; secure`;
};

// 토큰 상태 atom을 읽기/쓰기 가능하도록 수정
const tokenAtom = atom({
  accessToken: getCookie('accessToken'),
  refreshToken: getCookie('refreshToken'),
});

// 액세스 토큰 설정
const setAccessTokenAtom = atom(null, (get, set, accessToken: string) => {
  setCookie('accessToken', accessToken, { maxAge: 2 * 7 * 24 * 3600 }); // 2주 (7200초)
  const currentToken = get(tokenAtom);
  set(tokenAtom, { ...currentToken, accessToken }); // atom 상태 업데이트
});

// 리프레시 토큰 설정
const setRefreshTokenAtom = atom(null, (get, set, refreshToken: string) => {
  setCookie('refreshToken', refreshToken, { maxAge: 2 * 7 * 24 * 3600 }); // 2주
  const currentToken = get(tokenAtom);
  set(tokenAtom, { ...currentToken, refreshToken }); // atom 상태 업데이트
});

// 토큰 초기화
const clearTokenAtom = atom(null, (get, set) => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
});

// 토큰 상태 가져오기
const getTokenState = () => {
  if (typeof window === 'undefined') {
    return { accessToken: '', refreshToken: '' };
  }

  return {
    accessToken: getCookie('accessToken'),
    refreshToken: getCookie('refreshToken'),
  };
};

export {
  tokenAtom,
  setAccessTokenAtom,
  setRefreshTokenAtom,
  clearTokenAtom,
  getTokenState,
  setCookie,
  getCookie,
  deleteCookie,
};
