'use client';

import { tokenAtom } from '@/store/useTokenStore';
import { getToken, setTokenCookie } from '@/utils/tokenUtils';
import axios from 'axios';
import { useAtom } from 'jotai';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const [tokens] = useAtom(tokenAtom); // 토큰 상태 읽기
    if (tokens.accessToken) {
      config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 토큰 갱신 처리
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getToken().refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        const response = await instance.post('/user/refreshToken', { refresh_token: refreshToken });
        const { access_token, refresh_token } = response.data.data;

        // 토큰 업데이트 및 쿠키에 저장
        setTokenCookie('accessToken', access_token);
        setTokenCookie('refreshToken', refresh_token);

        return instance(originalRequest); // 새 토큰으로 원래 요청 재시도
      } catch (err) {
        console.error('Token refresh failed', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
