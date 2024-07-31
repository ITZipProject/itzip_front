'use client';

import React from 'react';
import QuizFilterAndTopBar from '../../../components/quiz/QuizFilterAndTopBar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-6">
      <QuizFilterAndTopBar />
    </div>
  );
}
