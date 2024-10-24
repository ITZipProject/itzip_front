import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

import MyQuizSection from '@/components/quiz/MyQuizSection';
import QuizFilter from '@/components/quiz/QuizFilter';

import { QuizData } from '../../../types/quiz/quiz';
import QuizCardSection from '../../quiz/QuizCardSection';
import QuizSort from '../../quiz/QuizSort';

const queryClient = new QueryClient();

const QuizPageLayout: React.FC = () => {
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizData[]>([]);

  const handleFilteredQuizzes = (filteredQuizzes: QuizData[]) => {
    setFilteredQuizzes(filteredQuizzes);
  };

  return (
    <div className="flex size-full flex-col gap-8 overflow-y-auto bg-neutral-800 px-5 py-8 text-white md:gap-12 md:px-10 md:py-14">
      <QueryClientProvider client={queryClient}>
        <MyQuizSection />
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <section className="hidden md:block md:w-1/4">
            <QuizFilter />
          </section>
          <section className="flex w-full flex-col md:w-3/4">
            <QuizSort handleFilteredQuizzes={handleFilteredQuizzes} />
            <QuizCardSection filteredAndSortedQuizzes={filteredQuizzes} />
          </section>
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default QuizPageLayout;
