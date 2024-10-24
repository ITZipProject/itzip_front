'use server';

import instance from '@/api/axiosInstance';
import { cookies } from 'next/headers';

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export async function loginAction(
  email: string,
  password: string,
): Promise<{
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
}> {
  try {
    // post 요청 시 반환되는 토큰을 쿠키에 저장, 토큰을 클라이언트에서 사용할 수 있게 리턴
    const response = await instance.post<LoginResponse>('/user/login', { email, password });

    const { data } = response.data;
    console.log('login server!', data);
    // 액세스 토큰을 쿠키에 저장
    cookies().set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 3600, // 7일 (초 단위)
      path: '/',
    });

    // 리프레시 토큰도 저장
    if (data.refreshToken) {
      cookies().set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 3600, // 7일 (초 단위)
        path: '/',
      });
    }

    return {
      success: true,
      message: '로그인 성공',
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error('로그인 에러:', error);
    if (error instanceof Error) {
      return { success: false, message: `로그인 실패: ${error.message}` };
    }
    return { success: false, message: '로그인 실패: 알 수 없는 오류' };
  }
}
