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

const fetchFilteredQuizzes = async (accessToken: string): Promise<Quiz[]> => {
  const response = await axios.get<ApiResponse>('/cs-quizzes/search', {
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      inUserSolved: true,
    },
  });
  return response.data.data.content;
};

export const useMyQuizzes = (accessToken: string) => {
  return useQuery<Quiz[]>({
    queryKey: ['filteredQuizzes', accessToken],
    queryFn: () => fetchFilteredQuizzes(accessToken),
    staleTime: 1000,
    enabled: !!accessToken,
  });
};
