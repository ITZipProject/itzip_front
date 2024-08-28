// import React from 'react';
// import { QuizData } from '../../types/quiz/quiz';

// interface MyQuizCardProps {
//   quiz: QuizData;
//   onClick: () => void;
// }

// const MyQuizCard: React.FC<MyQuizCardProps> = ({ quiz, onClick }) => {
//   const renderDifficultyLevel = (difficulty: number) => {
//     switch (difficulty) {
//       case 1:
//         return 'Level 1';
//       case 2:
//         return 'Level 2';
//       case 3:
//         return 'Level 3';
//       default:
//         return 'Unknown Level';
//     }
//   };

//   return (
//     <div
//       className="flex flex-col w-full h-full bg-neutral-800 items-center cursor-pointer rounded-lg gap-8 p-8"
//       onClick={onClick}
//     >
//       <div className="w-full h-1/6 flex justify-between">
//         <h3 className=" text-slate-400 text-center text-xs rounded-sm">{quiz.category}</h3>
//       </div>
//       <div className=" w-full h-3/5">
//         <h3 className=" font-bold text-slate-300 text-2xl text-center">{quiz.questionText}</h3>
//       </div>

//       <div className="w-full h-1/3 flex justify-between items-center">
//         <h3 className=" text-slate-400 text-center rounded-sm">
//           {renderDifficultyLevel(quiz.difficulty)}
//         </h3>
//         <h3 className=" text-slate-400 text-center text-lg">{quiz.triedUserCount}명이 푼 문제</h3>
//       </div>
//     </div>
//   );
// };

// export default MyQuizCard;

import React from 'react';
import { QuizData } from '../../types/quiz/quiz';

interface MyQuizCardProps {
  quiz: QuizData;
  onClick: () => void;
}

const MyQuizCard: React.FC<MyQuizCardProps> = ({ quiz, onClick }) => {
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
      className="flex flex-col w-96 h-64 bg-neutral-800 items-center cursor-pointer rounded-lg gap-4 p-4"
      onClick={onClick}
    >
      <div className="w-full h-1/6 flex justify-between">
        <h3 className="text-slate-400 text-center text-xs rounded-sm">{quiz.category}</h3>
      </div>
      <div className="w-full h-3/5 overflow-hidden">
        <h3 className="font-bold text-slate-300 text-2xl text-center ">{quiz.questionText}</h3>
      </div>
      <div className="w-full h-1/6 flex justify-between items-center">
        <h3 className="text-slate-400 text-center rounded-sm">
          {renderDifficultyLevel(quiz.difficulty)}
        </h3>
        <h3 className="text-slate-400 text-center text-lg">{quiz.triedUserCount}명이 푼 문제</h3>
      </div>
    </div>
  );
};

export default MyQuizCard;
