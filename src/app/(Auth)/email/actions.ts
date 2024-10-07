'use server';

import { cookies } from 'next/headers';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  nickname: string;
}

export async function loginAction(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; accessToken?: string; refreshToken?: string }> {
  try {
    // API 호출을 통한 로그인 로직
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('로그인 실패');
    }

    const data = (await response.json()) as LoginResponse;

    // 액세스 토큰을 쿠키에 저장
    cookies().set('accessToken', data.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1시간 (초 단위)
      path: '/',
    });

    // 리프레시 토큰도 저장
    if (data.refreshToken) {
      cookies().set('refreshToken', data.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 3600, // 7일 (초 단위)
        path: '/',
      });
    }

    // 성공 응답에 accessToken과 refreshToken 포함
    return {
      success: true,
      message: '로그인 성공',
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
    };
  } catch (error) {
    console.error('로그인 에러:', error);
    return { success: false, message: '로그인 실패' };
  }
}
