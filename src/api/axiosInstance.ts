'use client';

import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getDefaultStore } from 'jotai';

import { tokenAtom, setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore';
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
  (response) => response,
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
        const response = await instance.post<TokenResponse>('/user/refreshToken', {
          refreshToken: refreshToken,
        });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        // 새 토큰을 쿠키와 상태에 저장
        setTokenCookie('accessToken', newAccessToken);
        setTokenCookie('refreshToken', newRefreshToken);

        // Jotai 상태에 새 토큰 값 설정
        store.set(setAccessTokenAtom, newAccessToken);
        store.set(setRefreshTokenAtom, newRefreshToken);

        // 원래 요청을 새로운 토큰으로 재시도
        return instance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
