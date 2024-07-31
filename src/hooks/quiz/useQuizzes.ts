import { useAtom } from 'jotai';
import { quizzesAtom } from '../../lib/atoms/atoms';
import { QuizData } from '../../types/quiz/quiz';

const useQuizzes = () => {
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);

  const handleAddQuiz = (quizData: QuizData) => {
    setQuizzes((prevQuizzes) => [...prevQuizzes, quizData]);
  };

  return {
    quizzes,
    handleAddQuiz,
  };
};

export default useQuizzes;
