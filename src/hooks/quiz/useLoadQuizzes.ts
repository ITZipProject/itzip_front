import { useSetAtom } from 'jotai';
import { quizzesAtom } from '../../lib/atoms/atoms';
import { fetchQuizzes } from '@/api/quiz/fetchQuizzes';

export const useLoadQuizzes = () => {
  const setQuizzes = useSetAtom(quizzesAtom);

  const loadQuizzes = async () => {
    try {
      const data = await fetchQuizzes();
      if (data) {
        setQuizzes(data);
      }
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
    }
  };

  return loadQuizzes;
};
