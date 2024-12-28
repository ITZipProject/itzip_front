'use server';
import { cookies } from 'next/headers';

import instance from '@/api/axiosInstance';

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

// 쿠키 삭제 함수
const deleteServerCookie = (name: string) => {
  cookies().delete(name);
};

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

    // 서버 쿠키 삭제
    deleteServerCookie('accessToken');
    deleteServerCookie('refreshToken');

    return { success: true };
  } catch (err) {
    console.error('Failed Logout:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : '로그아웃 중 오류가 발생했습니다.',
    };
  }
};

export const out = async (accessToken: string) => {
  try {
    const res = await instance.delete('/user/out', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    // 회원 탈퇴 시 쿠키 삭제
    deleteServerCookie('accessToken');
    deleteServerCookie('refreshToken');

    return { success: true };
  } catch (err) {
    console.error('Failed to delete account:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : '회원 탈퇴 중 오류가 발생했습니다.',
    };
  }
};
