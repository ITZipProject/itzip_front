'use server';
import instance from '@/api/axiosInstance';
import { cookies } from 'next/headers';

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const refreshTokens = async (accessToken: string, refreshToken: string) => {
  try {
    const response = await instance.patch(
      'user/refreshToken',
      {
        refreshToken: refreshToken, // request body에 refreshToken 포함
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 accessToken 포함
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      return {
        accessToken: response.headers.authorization,
        refreshToken: response.headers.refresh,
      };
    }
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

// 쿠키 설정 함수
const setServerCookie = (name: string, value: string, maxAge: number) => {
  cookies().set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge,
    path: '/',
  });
};

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
