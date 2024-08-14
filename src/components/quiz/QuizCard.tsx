import React from 'react';
import { QuizData } from '../../types/quiz/quiz';

interface QuizCardProps {
  quiz: QuizData;
  onClick: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
  const correctRate = quiz.tried_user_count
    ? (quiz.accepted_user_count / quiz.tried_user_count) * 100
    : 0;

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
      className="flex flex-col w-full h-[400px] bg-neutral-800 items-center cursor-pointer rounded-lg gap-8 p-3"
      onClick={onClick}
    >
      <div className="w-full flex justify-between">
        <h3 className=" text-slate-400 text-center">{renderDifficultyLevel(quiz.difficulty)}</h3>
        <h3 className=" text-slate-400 text-center">{quiz.category}</h3>
      </div>
      <div className=" w-full h-3/5">
        <h3 className=" font-bold text-slate-300 text-2xl text-center">{quiz.question_text}</h3>
      </div>
      <div className="flex gap-5 justify-between items-center">
        <h3 className=" text-slate-400 text-center text-lg">{correctRate.toFixed(2)}%</h3>
      </div>
    </div>
  );
};

export default QuizCard;
