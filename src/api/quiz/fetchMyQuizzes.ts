import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Quiz {
  id: string;
  questionText: string;
  difficulty: number;
  categoryId: number;
  category: string;
  acceptedUserCount: number;
  triedUserCount: number;
  correctRate: number;
  points: number;
  userQuizStatus: string;
  createDate: string;
  modifyDate: string;
  choices: {
    id: number;
    choiceText: string;
  }[];
}

interface ApiResponse {
  data: {
    content: Quiz[];
  };
}

const fetchFilteredQuizzes = async (): Promise<Quiz[]> => {
  const response = await axios.get<ApiResponse>('/cs-quizzes/search', {
    baseURL: apiUrl,
    params: {
      inUserSolved: true,
    },
  });
  return response.data.data.content;
};

export const useMyQuizzes = () => {
  return useQuery<Quiz[]>({
    queryKey: ['filteredQuizzes'],
    queryFn: () => fetchFilteredQuizzes(),
    staleTime: 1000,
  });
};
