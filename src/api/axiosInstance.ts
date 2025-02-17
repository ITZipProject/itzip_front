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

// 토큰 갱신 상태 관리를 위한 변수들
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 대기 중인 요청들을 처리하는 함수
const onRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

// 토큰 갱신 요청을 구독하는 함수
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

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

      if (!isRefreshing) {
        isRefreshing = true;

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
              rotate: true,
            },
            { headers: { noAuth: true } },
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;

          // 새로운 리프레시 토큰도 함께 저장
          setTokenCookie('accessToken', accessToken);
          setTokenCookie('refreshToken', newRefreshToken);

          store.set(setAccessTokenAtom, accessToken);
          store.set(setRefreshTokenAtom, newRefreshToken);

          onRefreshed(accessToken);

          // headers 초기화 및 토큰 설정
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return instance(originalRequest);
        } catch (err) {
          // 토큰 회전 실패 시 보안을 위해 즉시 로그아웃
          store.set(setAccessTokenAtom, null);
          store.set(setRefreshTokenAtom, null);
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');

          window.location.href = '/';
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        // 토큰 갱신 중일 때의 요청 처리
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
