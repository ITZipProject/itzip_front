import { useQuery } from '@tanstack/react-query';
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

export const useFilteredQuizzes = ({
  difficulty,
  category,
  sortOrder,
  page,
  keyword,
}: UseFilteredQuizzesProps) => {
  return useQuery({
    queryKey: ['filteredQuizzes', category, difficulty, sortOrder, page, keyword],
    queryFn: () => fetchFilteredQuizzes({ difficulty, category, sortOrder, page, keyword }),
    // keepPreviousData: true,
    staleTime: 1000,
  });
};
