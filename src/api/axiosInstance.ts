import axios from 'axios';
import {
  getCookie,
  setAccessTokenAtom,
  setRefreshTokenAtom,
  clearTokenAtom,
} from '@/store/useTokenStore';
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
          const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);

          if (tokenPayload.exp > currentTime) {
            return instance(originalRequest);
          }

          const response = await instance.patch(
            'user/refreshToken',
            { refreshToken },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            },
          );
          if (response.status === 200) {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

            store.set(setAccessTokenAtom, newAccessToken);
            store.set(setRefreshTokenAtom, newRefreshToken);

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
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
