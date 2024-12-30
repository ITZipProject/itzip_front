'use server';

import axios, { AxiosError } from 'axios';
import { getDefaultStore } from 'jotai';
import { cookies } from 'next/headers';

import { getCookie, clearTokenAtom } from '@/store/useTokenStore';

interface RefreshResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  status: number;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
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
    if (!error?.config) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    const store = getDefaultStore();

    if (error.response?.status === 401 && !originalRequest.headers?._retry) {
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers._retry = true;

      const refreshToken = getCookie('refreshToken');

      if (refreshToken) {
        try {
          const response = await instance.patch<RefreshResponse>('user/refreshToken', {
            refreshToken,
          });
          if (response.status === 200) {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
              response.data.data;

            cookies().set('accessToken', newAccessToken, {
              httpOnly: true,
              secure: true,
            });
            cookies().set('refreshToken', newRefreshToken, {
              httpOnly: true,
              secure: true,
            });
            cookies().set('currentToken', 'B');

            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            }
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error('토큰 갱신 실패:', refreshError);
          store.set(clearTokenAtom);

          if (typeof window !== 'undefined') {
            window.location.href = '/';
          }
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
