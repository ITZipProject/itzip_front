import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getDefaultStore } from 'jotai';
import { getTokenState, setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
  withCredentials: true,
});

// Request Interceptor
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

    if (noAuth) return config;

    if (!accessToken) {
      console.log('토큰이 없습니다');
      if (!noAuth) {
        throw new Error('인증이 필요한 요청입니다.');
      }
    }

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (onlyRefresh && refreshToken) {
      config.headers['Refresh'] = `Bearer ${refreshToken}`;
    }

    if (bothTokens && refreshToken && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['Refresh'] = `Bearer ${refreshToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err),
);

// 토큰 갱신 함수
async function refreshTokenAndUpdateRequest(
  error: AxiosError,
  originalRequest: AxiosRequestConfig & { _retry?: boolean },
) {
  const store = getDefaultStore();
  const { refreshToken } = getTokenState();

  try {
    // 리프레시 토큰으로 새 액세스 토큰 요청
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/refreshToken`,
      {},
      {
        headers: {
          Authorization: originalRequest.headers?.['Authorization'],
          Refresh: `Bearer ${refreshToken}`,
        },
      },
    );

    if (res.status === 200) {
      const newAccessToken = res.headers.authorization;
      const newRefreshToken = res.headers.refresh;

      if (originalRequest.headers && !originalRequest.headers['No-Auth']) {
        // 새 액세스 토큰 설정
        if (newAccessToken) {
          instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          store.set(setAccessTokenAtom, newAccessToken);
        }

        // 새 리프레시 토큰이 있다면 설정 (리프레시 토큰 순환)
        if (newRefreshToken) {
          instance.defaults.headers.common['Refresh'] = `Bearer ${newRefreshToken}`;
          store.set(setRefreshTokenAtom, newRefreshToken);
        }

        // 원래 요청 재시도
        return instance(originalRequest);
      }
    }
    throw new Error('토큰 갱신 실패');
  } catch (error) {
    // 리프레시 토큰도 만료된 경우에만 로그아웃
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      store.set(setAccessTokenAtom, '');
      store.set(setRefreshTokenAtom, '');
      alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
}

// Response Interceptor
instance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean };
    const { accessToken, refreshToken } = getTokenState();

    // 401 에러이고 토큰이 있고 아직 재시도하지 않은 경우
    if (err.response?.status === 401 && accessToken && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신 시도
        return await refreshTokenAndUpdateRequest(err, originalRequest);
      } catch (refreshError) {
        // 갱신 실패 시 원본 에러 반환
        return Promise.reject(err);
      }
    }

    // 다른 에러는 그대로 반환
    return Promise.reject(err);
  },
);

export default instance;
