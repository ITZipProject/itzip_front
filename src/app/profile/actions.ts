// actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import instance from '@/api/axiosInstance';

export async function logoutServerAction() {
  try {
    // 서버에 로그아웃 요청
    const res = await instance.delete('/user/logout');
    console.log('로그아웃 응답:', res.data);
    if (res.status === 403) {
      console.log('로그아웃 실패', res.data);
    }

    if (res.status === 200) {
      console.log('로그아웃 성공', res.data);
    }
    // 쿠키 제거
    const cookieStore = cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    // 추가적인 보안을 위해 쿠키를 명시적으로 만료 설정
    cookieStore.set('accessToken', '', { maxAge: 0 });
    cookieStore.set('refreshToken', '', { maxAge: 0 });
  } catch (err) {
    console.error('로그아웃 중 오류 발생:', err);
    // 오류 처리 (예: 사용자에게 알림)
  }
}
