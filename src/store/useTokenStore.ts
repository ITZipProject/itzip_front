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
  const success = setCookie('accessToken', accessToken, {
    maxAge: 2 * 7 * 24 * 3600,
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
  if (success) {
    console.log('액세스 토큰 쿠키 저장 성공 (setAccessTokenAtom)');
  }
  if (!success) {
    console.error('액세스 토큰 쿠키 저장 실패');
    return;
  }

  const currentToken = get(tokenAtom);
  set(tokenAtom, { ...currentToken, accessToken });
});

// 리프레시 토큰 설정
const setRefreshTokenAtom = atom(null, (get, set, refreshToken: string) => {
  const success = setCookie('refreshToken', refreshToken, {
    maxAge: 2 * 7 * 24 * 3600,
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
  if (success) {
    console.log('리프레시 토큰 쿠키 저장 성공 (setRefreshTokenAtom)');
  }
  if (!success) {
    console.error('리프레시 토큰 쿠키 저장 실패');
    return;
  }

  const currentToken = get(tokenAtom);
  set(tokenAtom, { ...currentToken, refreshToken });
});

// 토큰 초기화
const clearTokenAtom = atom(null, () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  console.log('토큰 모두 삭제 완료 (clearTokenAtom)');
});

// 토큰 상태 가져오기
const getTokenState = () => {
  if (typeof window === 'undefined') {
    console.log('토큰을 가져옵니다. (getTokenState)');
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
