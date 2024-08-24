import React, { useState, useEffect } from 'react';
import { QuizData } from '../../../types/quiz/quiz';
import QuizFilterBar from '../../quiz/QuizFilterBar';
import QuizCardSection from '../../quiz/QuizCardSection';
import MyQuizSection from '@/components/quiz/MyQuizSection';

const QuizPageLayout: React.FC = () => {
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizData[]>([]);

  const handleFilteredQuizzes = (filteredQuizzes: QuizData[]) => {
    setFilteredQuizzes(filteredQuizzes);
  };

  return (
    <div className="flex flex-col w-full h-full px-28 py-14 gap-12 overflow-y-auto text-white bg-neutral-900">
      <MyQuizSection />
      <QuizFilterBar handleFilteredQuizzes={handleFilteredQuizzes} />
      <QuizCardSection filteredAndSortedQuizzes={filteredQuizzes} />
    </div>
  );
};

export default QuizPageLayout;
