import { useState, useEffect } from 'react';
import { fetchQuizzes } from '../../api/quiz/fetchQuizzes';
import { QuizData } from '../../types/quiz/quiz';

const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data);
        setFilteredQuizzes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddQuiz = (quizData: QuizData) => {
    const updatedQuizzes = [...quizzes, quizData];
    setQuizzes(updatedQuizzes);
    setFilteredQuizzes(updatedQuizzes);
  };

  return {
    quizzes,
    filteredQuizzes,
    setFilteredQuizzes,
    handleAddQuiz,
  };
};

export default useQuizzes;
