import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from '@/store/useTokenStore';
import { getDefaultStore } from 'jotai';
import { tokenAtom } from '@/store/useTokenStore';

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
  async (error) => {
    const originalRequest = error.config;
    const store = getDefaultStore();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');

      if (accessToken && refreshToken) {
        try {
          const response = await instance.patch(
            'user/refreshToken',
            { refreshToken },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                accept: '*/*',
              },
            },
          );

          if (response.status === 200) {
            const newAccessToken = response.headers.authorization;
            const newRefreshToken = response.headers.refresh;

            setCookie('accessToken', newAccessToken, { maxAge: 2 * 7 * 24 * 3600 });
            setCookie('refreshToken', newRefreshToken, { maxAge: 2 * 7 * 24 * 3600 });

            store.set(tokenAtom, {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            });

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');

          store.set(tokenAtom, {
            accessToken: '',
            refreshToken: '',
          });

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
