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

    // 값 인코딩
    const encodedValue = encodeURIComponent(value);

    // 쿠키 옵션 구성
    const cookieOptions = [
      `${name}=${encodedValue}`,
      `path=${path}`,
      maxAge && `max-age=${maxAge}`,
      secure && 'secure',
      `samesite=${sameSite}`,
      domain && `domain=${domain}`,
    ]
      .filter(Boolean)
      .join('; ');

    // 쿠키 설정
    document.cookie = cookieOptions;

    return true;
  } catch (error) {
    console.error(`Error setting cookie '${name}':`, error);
    return false;
  }
};

// 쿠키 가져오기 함수
const getCookie = (name: string): string => {
  // SSR 체크
  if (typeof window === 'undefined') return '';

  try {
    // 정규식을 사용한 쿠키 파싱
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));

    // null 체크와 디코딩
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

// 리프레시 토큰 설정
const setRefreshTokenAtom = atom(null, (get, set, refreshToken: string) => {
  setCookie('refreshToken', refreshToken, { maxAge: 2 * 7 * 24 * 3600 }); // 2주
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

export { tokenAtom, setRefreshTokenAtom, clearTokenAtom, getTokenState };
