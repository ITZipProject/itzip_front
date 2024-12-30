/* eslint-disable */

import { setAccessTokenAtom } from '@/store/useTokenStore';
import axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useSolvedacLinkStatus = () => {
  const [isSolvedacLinked, setIsSolvedacLinked] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken] = useAtom(setAccessTokenAtom);

  useEffect(() => {
    if (!accessToken) {
      setIsSolvedacLinked(null);
      setLoading(false);
      return;
    }

    const checkSolvedacLinkStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.get('algorithm/user', {
          baseURL: apiUrl,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('response: ', response);
        if (response.data.code === 'SUCCESS') {
          setIsSolvedacLinked(true);
        } else {
          setIsSolvedacLinked(false);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.data.code === 'NOT_FOUND_SOLVEDAC_USER') {
            setIsSolvedacLinked(false);
          } else {
            setError('An error occurred while checking solved.ac link status');
            console.error(error);
          }
        } else {
          setError('An unknown error occurred');
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    checkSolvedacLinkStatus();
  }, [accessToken]);

  return { isSolvedacLinked, loading, error };
};
