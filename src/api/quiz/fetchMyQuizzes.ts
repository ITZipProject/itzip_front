import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchFilteredQuizzes = async () => {
  console.log('fetchFilteredQuizzes');
  const response = await axios.get('/cs-quizzes/search', {
    baseURL: apiUrl,
    params: {
      userId: 7,
      inUserSolved: true,
    },
  });
  return response.data.data.content;
};

export const fetchMyQuizzes = () => {
  return useQuery({
    queryKey: ['filteredQuizzes'],
    queryFn: () => fetchFilteredQuizzes(),
    staleTime: 1000,
  });
};
