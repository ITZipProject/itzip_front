import React from 'react';

import { QuizData } from '../../types/quiz/quiz';

interface MyQuizCardProps {
  quiz: QuizData;
}

const MyQuizCard: React.FC<MyQuizCardProps> = ({ quiz }) => {
  const renderDifficultyLevel = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'Level 1';
      case 2:
        return 'Level 2';
      case 3:
        return 'Level 3';
      default:
        return 'Unknown Level';
    }
  };

  return (
    <div className="lg:w-264px flex h-[150] w-[224px] cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-lg bg-neutral-700 p-4 lg:h-[166px]">
      <div className="flex h-1/6 w-full justify-between">
        <h3 className="rounded-sm text-center text-xs text-slate-400">{quiz.category}</h3>
      </div>
      <div className="h-3/5 w-full overflow-hidden">
        <h3 className="truncate text-center text-2xl font-bold text-slate-300">
          {quiz.questionText}
        </h3>
      </div>
      <div className="flex h-1/6 w-full items-center justify-between">
        <h3 className="rounded-sm text-center text-slate-400">
          {renderDifficultyLevel(quiz.difficulty)}
        </h3>
        <h3 className="text-center text-lg text-slate-400">{quiz.triedUserCount}명이 푼 문제</h3>
      </div>
    </div>
  );
};

export default MyQuizCard;
