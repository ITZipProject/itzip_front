/* eslint-disable */
import { tokenAtom } from '@/store/useTokenStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UseFilteredQuizzesProps {
  difficulty: number | null;
  category: number | '';
  sortOrder: 'NEWEST' | 'OLDEST' | 'RECOMMENDED';
  page: number;
  keyword: string;
  accessToken: string | null;
}

const fetchFilteredQuizzes = async ({
  difficulty,
  category,
  sortOrder,
  page,
  keyword,
  accessToken,
}: UseFilteredQuizzesProps) => {
  if (!accessToken) throw new Error('Access token is missing');

  const response = await axios.get('/cs-quizzes/search', {
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      difficulty,
      categoryId: category,
      sortBy: sortOrder,
      inUserSolved: false,
      page,
      size: 9,
      keyword,
    },
  });

  console.log(response.data);
  return response.data.data;
};

export const useFilteredQuizzes = () => {
  const [accessToken] = useAtom(tokenAtom);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [category, setCategory] = useState<number | ''>('');
  const [sortOrder, setSortOrder] = useState<'NEWEST' | 'OLDEST' | 'RECOMMENDED'>('NEWEST');
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const difficultyParam = searchParams.get('difficulty');
      const categoryParam = searchParams.get('category');
      const searchKeyword = searchParams.get('keyword');
      const sortOrderParam = searchParams.get('sortOrder');
      const pageParam = searchParams.get('page');

      setDifficulty(difficultyParam ? parseInt(difficultyParam) : null);
      setCategory(categoryParam ? parseInt(categoryParam) : '');
      setKeyword(searchKeyword ?? '');
      setSortOrder((sortOrderParam as 'NEWEST' | 'OLDEST' | 'RECOMMENDED') ?? 'NEWEST');
      setPage(pageParam ? parseInt(pageParam) : 0);
    }
  }, [searchParams]);

  return useQuery({
    queryKey: ['filteredQuizzes', category, difficulty, sortOrder, page, keyword],
    queryFn: () => {
      if (!accessToken) {
        return Promise.reject(new Error('Access token is not available'));
      }
      return fetchFilteredQuizzes({
        difficulty,
        category,
        sortOrder,
        page,
        keyword,
        accessToken: accessToken.accessToken as string,
      });
    },
    staleTime: 1000,
    enabled: !!accessToken,
  });
};
