import { LoginResponse } from '@/types/auth';

import instance from '../axiosInstance';
import axios from 'axios';
import { setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore';
import { getDefaultStore } from 'jotai';
import Cookies from 'js-cookie';

// 중첩된 data 구조를 반영하는 API 응답 타입
interface ApiResponse<T> {
  data: {
    data: T;
    message?: string;
    status?: number;
    accessToken?: string;
    refreshToken?: string;
  };
}
interface TokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
export const refreshToken = async (refreshToken: string) => {
  const store = getDefaultStore();
  const response = await instance.patch<TokenResponse>(
    '/user/refreshToken',
    {
      refreshToken,
    },
    {
      headers: {
        noAuth: true,
      },
    },
  );
  const { accessToken, refreshToken: newRefreshToken } = response.data.data;

  // Jotai 상태에 새 토큰 값 설정
  store.set(setAccessTokenAtom, accessToken);
  store.set(setRefreshTokenAtom, newRefreshToken);
  Cookies.set('test token', 'test refresh token', { expires: 7, path: '/' });
  console.log('res', setAccessTokenAtom);
};

// 이메일 중복 체크 (인증 없이 요청)
export const checkEmail = async (email: string) => {
  try {
    const res = await instance.get<ApiResponse<boolean>>('/user/checkDuplicateEmail', {
      params: { email },
      headers: { noAuth: true },
    });
    return {
      success: true,
      data: res.data.data,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : '이메일 중복 체크 오류',
    };
  }
};

// 인증 코드 전송 (인증 없이 요청)
export const sendCode = async (email: string) => {
  try {
    const res = await instance.post<ApiResponse<{ message: string }>>(
      '/user/authEmail',
      { email },
      {
        headers: { noAuth: true },
      },
    );
    return {
      success: true,
      data: res.data.data,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : '인증 코드 전송 오류',
    };
  }
};

// 인증 코드 확인 (인증 없이 요청)
export const checkCode = async (email: string, authCode: string) => {
  try {
    const res = await instance.get<ApiResponse<boolean>>('/user/authEmail', {
      params: { email, authCode },
      headers: { noAuth: true },
    });
    console.log('checkCode___', res);
    return {
      success: true,
      data: res.data.data,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : '인증 코드 확인 오류',
    };
  }
};

// 계정 생성 (인증 없이 요청)
export const joinAction = async (
  email: string,
  password: string,
  password_check: string,
  auth_code: string,
) => {
  try {
    const res = await instance.post<ApiResponse<boolean>>(
      '/user/join',
      { email, password, passwordCheck: password_check, authCode: auth_code },
      {
        headers: { noAuth: true },
      },
    );
    return {
      success: true,
      data: res.data.data,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : '계정 생성 오류',
    };
  }
};

// 로그인 요청 (인증 없이 요청)
export const loginAction = async (email: string, password: string) => {
  try {
    const res = await instance.post<ApiResponse<LoginResponse>>(
      '/user/login',
      { email, password },
      { headers: { noAuth: true } },
    );
    if (!res.data.data.accessToken || !res.data.data.refreshToken) {
      throw new Error('토큰이 없습니다');
    }

    return {
      success: true,
      data: {
        accessToken: res.data.data.accessToken,
        refreshToken: res.data.data.refreshToken,
      },
      status: res.status,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : '로그인 오류',
    };
  }
};
