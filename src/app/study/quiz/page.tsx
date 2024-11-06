'use client';
import React, { Suspense } from 'react';

import QuizPageLayout from '../../../components/layout/quiz/QuizPageLayout';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPageLayout />
    </Suspense>
  );
}
