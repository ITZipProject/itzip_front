import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from '@/store/useTokenStore';

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

    // 토큰 만료 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');

      if (accessToken && refreshToken) {
        try {
          // 토큰 갱신 요청
          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/refreshToken`,
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

            // 새 토큰 저장 - 만료 시간을 2시간으로 수정
            setCookie('accessToken', newAccessToken, { maxAge: 2 * 60 * 60 }); // 2시간
            setCookie('refreshToken', newRefreshToken, { maxAge: 2 * 7 * 24 * 3600 }); // 2주

            // 원래 요청의 헤더 업데이트
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            // 원래 요청 재시도
            return instance(originalRequest);
          }
        } catch (refreshError) {
          // 토큰 갱신 실패 시 로그아웃 처리
          deleteCookie('accessToken');
          deleteCookie('refreshToken');

          // 로그인 페이지로 리다이렉트
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
