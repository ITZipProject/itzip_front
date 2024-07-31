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

  return (
    <div className="w-full">
      <div className="flex  w-full   justify-between items-center cursor-pointer" onClick={onClick}>
        <div className="w-1/2">
          <h3 className=" font-bold text-slate-300">{quiz.question_text}</h3>
        </div>
        <div className="flex w-1/3 gap-5 justify-between items-center">
          <h3 className="w-1/3 text-slate-400 text-center text-lg">{quiz.category}</h3>
          <h3 className="w-1/3 text-slate-400 text-center text-lg"> {quiz.difficulty}</h3>
          <h3 className="w-1/3 text-slate-400 text-center text-lg">{correctRate.toFixed(2)}%</h3>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
