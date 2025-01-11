import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getDefaultStore } from 'jotai';
import { tokenAtom, setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore';
import Cookies from 'js-cookie';
import { setTokenCookie } from '@/utils/tokenUtils';

// 토큰 상태 타입 정의
interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

// 커스텀 요청 설정 타입
interface CustomRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// 토큰 응답 타입 정의
interface TokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Jotai store 인스턴스 생성
const store = getDefaultStore();

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // store.get()을 사용하여 현재 토큰 상태를 가져옵니다.
    const tokens = store.get(tokenAtom) as TokenState; // 타입 안전하게 TokenState 사용

    // `noAuth` 헤더가 없고, 토큰이 있을 때만 Authorization 헤더 추가
    if (!config.headers['noAuth'] && tokens.accessToken) {
      config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 토큰 갱신 처리
instance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomRequestConfig;

    // 401 상태 코드가 반환되면 토큰 갱신을 시도합니다.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = store.get(tokenAtom)?.refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        // refresh token을 사용해 토큰 갱신 API 호출
        const response = await instance.patch<TokenResponse>(
          '/user/refreshToken',
          {
            refreshToken,
          },
          { headers: { noAuth: true } },
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        // 새 토큰을 쿠키와 상태에 저장
        setTokenCookie('accessToken', accessToken);
        setTokenCookie('refreshToken', newRefreshToken);

        // Jotai 상태에 새 토큰 값 설정
        store.set(setAccessTokenAtom, accessToken);
        store.set(setRefreshTokenAtom, newRefreshToken);

        // 쿠키에 새 토큰 값 저장
        Cookies.set('test token', 'test refresh token', { expires: 7, path: '/' });

        // 원래 요청을 새로운 토큰으로 재시도
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        // 원래의 요청을 새로운 토큰으로 다시 시도
        return instance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);

        // 토큰 갱신 실패 시, 상태를 초기화하고 로그아웃 처리
        store.set(setAccessTokenAtom, null);
        store.set(setRefreshTokenAtom, null);

        // 쿠키에서 토큰을 제거합니다.
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        // 사용자에게 알리고, 홈 화면으로 리다이렉트
        window.location.href = '/';

        return Promise.reject(err); // 에러 처리
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
