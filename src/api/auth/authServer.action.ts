'use server';
import { cookies } from 'next/headers';

import instance from '@/api/axiosInstance';

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const join = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const result = await instance.post<LoginResponse>(
      '/user/login',
      {
        email,
        password,
      },
      {
        headers: {
          'No-Auth': true,
        },
      },
    );
    const { data } = result.data;

    cookies().set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });
    cookies().set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 7 * 24 * 3600,
      path: '/',
    });

    return {
      success: true,
      data: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.',
    };
  }
};

export const logout = async () => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      console.log('로그아웃: 토큰이 없음');
      return;
    }

    await instance.delete('/user/logout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'No-Auth': true,
      },
    });

    // 로그아웃 후 쿠키 삭제
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
  } catch (err) {
    console.log('Failed Logout:', err);
  }
};

export const out = async (accessToken: string) => {
  try {
    const res = await instance.delete('/user/out', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('user out', res);
  } catch (err) {
    console.error(err);
  }
};
