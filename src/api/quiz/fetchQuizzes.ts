import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface UseFilteredQuizzesProps {
  difficulty: number | null;
  category: number | '';
  sortOrder: 'NEWEST' | 'OLDEST' | 'RECOMMENDED';
  page: number;
  keyword: string;
}

const fetchFilteredQuizzes = async ({
  difficulty,
  category,
  sortOrder,
  page,
  keyword,
}: UseFilteredQuizzesProps) => {
  console.log('fetchFilteredQuizzes');
  const response = await axios.get('/cs-quizzes/search', {
    baseURL: apiUrl,
    params: {
      difficulty,
      categoryId: category,
      sortBy: sortOrder,
      userId: 7,
      inUserSolved: true,
      page,
      size: 9,
      keyword,
    },
  });

  return response.data.data;
};

export const useFilteredQuizzes = () => {
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [category, setCategory] = useState<number | ''>('');
  const [sortOrder, setSortOrder] = useState<'NEWEST' | 'OLDEST' | 'RECOMMENDED'>('NEWEST');
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');

  const searchParams = useSearchParams();

  useEffect(() => {
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
  }, [searchParams]);

  return useQuery({
    queryKey: ['filteredQuizzes', category, difficulty, sortOrder, page, keyword],
    queryFn: () =>
      fetchFilteredQuizzes({
        difficulty,
        category,
        sortOrder,
        page,
        keyword,
      }),
    staleTime: 1000,
  });
};
