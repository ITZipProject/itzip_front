import React, { useState, useEffect } from 'react';
import { QuizData } from '../../../types/quiz/quiz';
import QuizFilterBar from '../../quiz/QuizFilterBar';
import QuizCardSection from '../../quiz/QuizCardSection';
import { useLoadQuizzes } from '../../../hooks/quiz/useLoadQuizzes';

const QuizPageLayout: React.FC = () => {
  const loadQuizzes = useLoadQuizzes();
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizData[]>([]);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleFilteredQuizzes = (filteredQuizzes: QuizData[]) => {
    setFilteredQuizzes(filteredQuizzes);
  };

  return (
    <div className="flex flex-col w-full h-full px-28 gap-12 overflow-y-auto text-white bg-neutral-900">
      <QuizFilterBar handleFilteredQuizzes={handleFilteredQuizzes} />
      <QuizCardSection filteredAndSortedQuizzes={filteredQuizzes} />
    </div>
  );
};

export default QuizPageLayout;
