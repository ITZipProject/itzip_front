// import React, { useState, useEffect } from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { QuizData } from '../../../types/quiz/quiz';
// import QuizSort from '../../quiz/QuizSort';
// import QuizCardSection from '../../quiz/QuizCardSection';
// import MyQuizSection from '@/components/quiz/MyQuizSection';
// import QuizFilter from '@/components/quiz/QuizFilter';
// const queryClient = new QueryClient();

// const QuizPageLayout: React.FC = () => {
//   const [filteredQuizzes, setFilteredQuizzes] = useState<QuizData[]>([]);

//   const handleFilteredQuizzes = (filteredQuizzes: QuizData[]) => {
//     setFilteredQuizzes(filteredQuizzes);
//   };

//   return (
//     <div className="flex flex-col w-full h-full px-10 py-14 gap-12 overflow-y-auto text-white bg-neutral-800">
//       <QueryClientProvider client={queryClient}>
//         <MyQuizSection />
//         <div className="w-full flex justify-center items-start mt-10 gap-5">
//           <section className="hidden sm:w-1/4 sm:block">
//             <QuizFilter />
//           </section>
//           <section className="flex flex-col w-full sm:w-4/5 ">
//             <QuizSort handleFilteredQuizzes={handleFilteredQuizzes} />
//             <QuizCardSection filteredAndSortedQuizzes={filteredQuizzes} />
//           </section>
//         </div>
//       </QueryClientProvider>
//     </div>
//   );
// };

// export default QuizPageLayout;

import React, { useState } from 'react';
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
    <div className="flex flex-col w-full h-full px-5 py-8 md:px-10 md:py-14 gap-8 md:gap-12 overflow-y-auto text-white bg-neutral-800">
      <QueryClientProvider client={queryClient}>
        <MyQuizSection />
        <div className="flex flex-col md:flex-row w-full gap-5">
          <section className="hidden md:w-1/4 md:block">
            <QuizFilter />
          </section>
          <section className="flex flex-col w-full md:w-3/4">
            <QuizSort handleFilteredQuizzes={handleFilteredQuizzes} />
            <QuizCardSection filteredAndSortedQuizzes={filteredQuizzes} />
          </section>
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default QuizPageLayout;
