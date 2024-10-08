'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutServerAction } from './actions';
import { clearTokenAtom } from '@/store/useTokenStore';
import { useAtom } from 'jotai';
import instance from '@/api/\baxiosInstance';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [, clearTokens] = useAtom(clearTokenAtom);

  const logOut = async () => {
    setLoading(true);
    try {
      const response = await instance.delete('/user/logout');
      console.log('로그아웃 성공:', response.data);

      clearTokens(); // Jotai store에서 토큰 제거

      const result = await logoutServerAction();
      if (result === false) {
        console.error('logout failed!', result);
      } else {
        // 로그아웃 성공 시 홈으로 리다이렉트 및 페이지 새로고침
        router.push('/').then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>프로필</h1>
      <button onClick={logOut} disabled={loading}>
        {loading ? '로그아웃 중...' : '로그아웃'}
      </button>
    </div>
  );
}
