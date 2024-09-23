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
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // 리프레시 토큰만 요청하고 싶을 때 (토큰 갱신)
    if (onlyRefresh && refreshToken) {
      config.headers['Refresh'] = `Bearer ${refreshToken}`;
    }
    // 액세스 & 리프레시 토큰 둘 다 필요할 때 (로그인)
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
  (res) => {
    return res;
  },
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean };
    const { setAccessToken, setRefreshToken, accessToken, refreshToken } = getTokenState() as {
      setAccessToken: (token: string) => void;
      setRefreshToken: (token: string) => void;
      accessToken: string;
      refreshToken: string;
    };

    // originalRequest._retry : 원래의 요청을 이미 한 번 다시 보냈는지를 나타내는 플레그 (토큰 갱신 시도)
    // 일반적으로 인증 실패에 대한 상태 코드는 401
    // api 문서에 400으로 되어 있기 때문에 400으로 수정함.
    if (accessToken && refreshToken && err.response?.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `Bearer ${refreshToken}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setAccessToken(res.headers.authorizaion as string);

            console.log(res);
            return instance(originalRequest);
          }
        })
        .catch(() => {
          console.log('올 삭제');
          setRefreshToken('');
          setAccessToken('');
        });
    }
    return Promise.reject(err);
  },
);

export default instance;
