'use server';

import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getDefaultStore } from 'jotai';
import { cookies } from 'next/headers';

import { clearTokenAtom, getToken } from '@/store/useTokenStore';

interface RefreshResponse {
  data: {
    data: {
      accessToken: string;
      refreshToken: string;
    };
    message: string;
    status: number;
  };
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    // 'No-Auth' 헤더가 있으면 인증이 필요없는 요청
    if (config.headers['No-Auth']) {
      delete config.headers['No-Auth'];
      return config;
    }

    // getToken 함수 사용
    const { accessToken } = getToken();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;
    const store = getDefaultStore();

    // 401 에러 && 토큰 갱신 시도하지 않은 요청
    if (error.response?.status === 401 && !originalRequest.headers?._retry) {
      try {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers._retry = true;

        const { refreshToken } = getToken();
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // 토큰 갱신 요청
        const response = await instance.patch<RefreshResponse>(
          'user/refreshToken',
          { refreshToken },
          { headers: { 'No-Auth': true } },
        );

        if (response.status === 200) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

          // 서버 쿠키 업데이트
          cookies().set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
          });
          cookies().set('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
          });

          // 원래 요청 재시도
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch (error) {
        // 토큰 갱신 실패 시 로그아웃 처리
        console.error('토큰 갱신 실패:', error);
        store.set(clearTokenAtom);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
