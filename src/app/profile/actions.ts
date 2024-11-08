// actions.ts
'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

export async function logoutServerAction() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    // 서버에 로그아웃 요청
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      console.log('로그아웃 성공', res.data);

      // 쿠키 제거
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');

      // 추가적인 보안을 위해 쿠키를 명시적으로 만료 설정
      cookieStore.set('accessToken', '', { maxAge: 0 });
      cookieStore.set('refreshToken', '', { maxAge: 0 });
    }

    return res.data as { success: boolean };
  } catch (err) {
    console.error('로그아웃 중 오류 발생:', err);
    throw err; // 에러를 상위로 전파하여 클라이언트에서 처리할 수 있도록 함
  }
}
