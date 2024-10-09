import React from 'react';
import { QuizData } from '../../types/quiz/quiz';

interface QuizCardProps {
  quiz: QuizData;
  onClick: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
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
    <div
      className="flex flex-col bg-neutral-700 items-center cursor-pointer rounded-lg gap-6 p-6 transition-transform transform hover:scale-105"
      onClick={onClick}
      style={{ minWidth: '224px' }}
    >
      <div className="w-full flex justify-between">
        <h3 className="text-slate-400 text-center text-xs sm:text-sm rounded-sm">
          {quiz.category}
        </h3>
      </div>
      <div className="w-full h-3/5 flex items-center justify-center">
        <h3 className="font-bold text-slate-300 text-xl sm:text-2xl text-center">
          {quiz.questionText}
        </h3>
      </div>

      <div className="w-full flex justify-between items-center">
        <h3 className="text-sm sm:text-base text-slate-400 text-center rounded-sm">
          {renderDifficultyLevel(quiz.difficulty)}
        </h3>
        <h3 className="text-sm sm:text-base text-slate-400 text-center">
          {quiz.triedUserCount}명이 푼 문제
        </h3>
      </div>
    </div>
  );
};

export default QuizCard;
