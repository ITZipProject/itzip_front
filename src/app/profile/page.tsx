'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import instance from '@/api/\baxiosInstance';
import { logoutServerAction } from './actions';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logOut = async () => {
    setLoading(true);
    try {
      const response = await instance.delete('/user/logout');
      console.log('로그아웃 성공:', response.data);

      const removeFromLocalStorage = (key: string) => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(key);
        }
      };
      removeFromLocalStorage('accessToken');
      removeFromLocalStorage('refreshToken');

      const result = await logoutServerAction();
      if (result === false) {
        console.error('logout failed!', result);
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 에러 처리 (예: 사용자에게 알림)
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
