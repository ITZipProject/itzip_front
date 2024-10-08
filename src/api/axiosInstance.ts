import axios from 'axios';
import { getTokenState } from '@/store/useTokenStore';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const { accessToken } = getTokenState();
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean };
    const { setAccessToken, setRefreshToken, accessToken, refreshToken } = getTokenState() as {
      setAccessToken: (token: string) => void;
      setRefreshToken: (token: string) => void;
      accessToken: string;
      refreshToken: string;
    };

    if (accessToken && refreshToken && err.response?.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/refreshToken`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `Bearer ${refreshToken}`,
            },
          },
        );

        if (res.status === 200) {
          setAccessToken(res.headers.authorization as string);
          return instance(originalRequest);
        }
      } catch (error) {
        console.log('토큰 갱신 실패, 모든 토큰 삭제');
        setRefreshToken('');
        setAccessToken('');
      }
    }
    return Promise.reject(err);
  },
);

export default instance;
