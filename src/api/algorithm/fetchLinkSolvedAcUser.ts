/* eslint-disable */
import { setAccessTokenAtom } from '@/store/useTokenStore';
import axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useSolvedacLink = (username: string | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken] = useAtom(setAccessTokenAtom);

  const linkSolvedAcUser = async () => {
    if (!username || !accessToken) {
      setError('아이디를 입력하거나 로그인 상태를 확인해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'algorithm/user',
        {}, // 요청 본문을 빈 객체로 설정
        {
          baseURL: apiUrl,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { username }, // 쿼리 파라미터로 username 전달
        },
      );

      console.log('response: ', response);

      if (response.data.code === 'SUCCESS') {
        // 성공 처리
      } else {
        setError('연동 실패');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data.code === 'NOT_FOUND_SOLVEDAC_USER') {
          setError('해당 유저를 찾을 수 없습니다.');
        } else {
          setError('연동 중 오류가 발생했습니다.');
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, linkSolvedAcUser };
};
