'use client';

import dynamic from 'next/dynamic';

const QuizPageLayout = dynamic(() => import('../../../components/layout/quiz/QuizPageLayout'), {
  ssr: false,
});

export default function Home() {
  return <QuizPageLayout />;
}
