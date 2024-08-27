import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuizData } from '../../../types/quiz/quiz';
import QuizSort from '../../quiz/QuizSort';
import QuizCardSection from '../../quiz/QuizCardSection';
import MyQuizSection from '@/components/quiz/MyQuizSection';
import QuizFilter from '@/components/quiz/QuizFilter';
const queryClient = new QueryClient();

const QuizPageLayout: React.FC = () => {
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizData[]>([]);

  const handleFilteredQuizzes = (filteredQuizzes: QuizData[]) => {
    setFilteredQuizzes(filteredQuizzes);
  };

  return (
    <div className="flex flex-col w-full h-full px-20 py-14 gap-12 overflow-y-auto text-white bg-neutral-900">
      <QueryClientProvider client={queryClient}>
        <MyQuizSection />
        <div className="w-full flex justify-center items-center gap-20">
          <div className="w-1/4">
            <QuizFilter />
          </div>
          <div className="flex flex-col w-3/4 ">
            <QuizSort handleFilteredQuizzes={handleFilteredQuizzes} />
            <QuizCardSection filteredAndSortedQuizzes={filteredQuizzes} />
          </div>
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default QuizPageLayout;
