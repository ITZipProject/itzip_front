import axios from 'axios';
import { QuizData } from '../../types/quiz/quiz';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchQuizzes = async (): Promise<QuizData[]> => {
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  try {
    const response = await axios.get('/cs-quizzes/search', {
      baseURL: apiUrl,
      params: {
        sortBy: 'NEWEST',
        inUserSolved: false,
        page: 0,
        size: 10,
      },
    });
    return response.data.data.content;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw new Error('Failed to fetch quizzes');
  }
};
