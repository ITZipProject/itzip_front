import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { getTokenState } from '@/store/useTokenStore';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

instance.interceptors.request.use(
  (config) => {
    const { accessToken, refreshToken } = getTokenState();

    // 특별한 헤더 삭제
    const noAuth: boolean = config.headers['No-Auth'] as boolean;
    const onlyRefresh: boolean = config.headers['Only-Refresh'] as boolean;
    const bothTokens: boolean = config.headers['Both-Tokens'] as boolean;

    delete config.headers['No-Auth'];
    delete config.headers['Only-Refresh'];
    delete config.headers['Both-Tokens'];

    // 토큰이 없을 때 (인증이 필요 없는 요청)
    if (noAuth) {
      return config;
    }
    if (!accessToken) {
      console.warn('토큰이 없습니다');
      // 필요한 처리
    }
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // 리프레시 토큰만 요청하고 싶을 때 (토큰 갱신)
    if (onlyRefresh && refreshToken) {
      config.headers['Refresh'] = `Bearer ${refreshToken}`;
    }
    // 액세스 & 리프레시 토큰 둘 다 필요할 때 (로그인 성공 후, 토큰 갱신)
    if (bothTokens && refreshToken && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['Refresh'] = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
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

    if (accessToken && refreshToken && err.response?.status === 401 && !originalRequest._retry) {
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
          if (res.headers.refresh) {
            setRefreshToken(res.headers.refresh as string);
          }
          return instance(originalRequest);
        }
      } catch (error) {
        alert('인증이 만료되었습니다. 다시 로그인해 주세요.');
        setRefreshToken('');
        setAccessToken('');
        window.location.href = '/';
      }
    }
    return Promise.reject(err);
  },
);

export default instance;
