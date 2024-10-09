// actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutServerAction() {
  // 액세스 토큰 쿠키 제거
  cookies().delete('accessToken');

  // 리프레시 토큰 쿠키 제거
  cookies().delete('refreshToken');

  redirect('/');
  // return true; // 또는 성공/실패를 나타내는 적절한 값
}
