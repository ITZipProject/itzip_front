// import React, { useState } from 'react';
// import { QuizData } from '../../types/quiz/quiz';
// import CorrectModal from '../quiz/CorrectModal';
// import IncorrectModal from '../quiz/IncorrectModal';
// import axios from 'axios';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const QuizShowModal: React.FC<ModalProps & QuizData> = ({
//   isOpen,
//   onClose,
//   questionText,
//   choices,
//   category,
//   difficulty,
//   id,
// }) => {
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [isCorrectModalOpen, setIsCorrectModalOpen] = useState(false);
//   const [isIncorrectModalOpen, setIsIncorrectModalOpen] = useState(false);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   if (!isOpen) return null;

//   const handleOptionClick = (index: number) => {
//     setSelectedOption(index);
//   };

//   const handleSubmitAnswer = async () => {
//     if (selectedOption === null) {
//       alert('선택지를 선택해주세요.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         '/cs-quiz/answer',
//         {
//           quizId: id,
//           answer: selectedOption + 1,
//           userId: 7,
//         },
//         {
//           baseURL: apiUrl,
//         },
//       );
//       if (response.data.data === 'CORRECT') {
//         setIsCorrectModalOpen(true);
//       } else {
//         setIsIncorrectModalOpen(true);
//       }
//     } catch (error: any) {
//       console.error('Failed to submit answer:', error);
//     }
//   };

//   const handleSubmitPoint = async (point: number) => {
//     try {
//       await axios.post(
//         '/cs-quiz/point',
//         {
//           userId: 7,
//           quizId: id,
//           points: point,
//         },
//         {
//           baseURL: apiUrl,
//         },
//       );
//     } catch (error: any) {
//       console.error('Failed to submit point:', error);
//     }
//   };

//   const closeCorrectModal = (selectedRate: number | null) => {
//     setIsCorrectModalOpen(false);
//     if (selectedRate !== null) {
//       handleSubmitPoint(selectedRate);
//     }
//     onClose();
//   };

//   const closeIncorrectModal = () => {
//     setIsIncorrectModalOpen(false);
//     onClose();
//   };

//   const difficultyLabel = difficulty === 1 ? 'Level 1' : difficulty === 2 ? 'Level 2' : 'Level 3';

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-zinc-900 px-8 rounded-lg shadow-lg relative w-1/2 h-5/6 max-w-5xl max-h-screen overflow-auto flex flex-col justify-start items-center gap-10">
//         <button className="absolute top-0 right-0 m-2" onClick={onClose}>
//           X
//         </button>
//         <div className="w-full flex justify-between px-8">
//           <h3 className="text-center mt-8 text-xl">{difficultyLabel}</h3>
//           <h3 className="text-center mt-8 text-xl">{category}</h3>
//         </div>

//         <h3 className=" mt-4 text-2xl">{questionText}</h3>
//         <div className="flex flex-col w-full mt-9 justify-start items-start">
//           {choices.map((choice, index) => (
//             <button
//               key={index}
//               className={`flex justify-start items-center w-2/3 text-center text-xl p-4 rounded-lg ${
//                 selectedOption === index ? 'bg-slate-500 text-white' : 'bg-gray-200'
//               }`}
//               onClick={() => handleOptionClick(index)}
//             >
//               {index + 1}. {choice.choiceText}
//             </button>
//           ))}
//         </div>
//         <button
//           className="flex justify-center items-center bg-gray-300 rounded-md px-24 py-5"
//           onClick={handleSubmitAnswer}
//         >
//           <h3>제출하기</h3>
//         </button>
//       </div>

//       {isCorrectModalOpen && <CorrectModal onClose={closeCorrectModal} />}
//       {isIncorrectModalOpen && <IncorrectModal onClose={closeIncorrectModal} />}
//     </div>
//   );
// };

// export default QuizShowModal;

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import CorrectModal from '../quiz/CorrectModal';
import IncorrectModal from '../quiz/IncorrectModal';

// QuizData 타입 정의
export interface Choice {
  choiceText: string;
  // 필요한 경우 다른 필드도 추가
}

export interface QuizData {
  questionText: string;
  choices: Choice[];
  category: string;
  difficulty: number;
  id: string;
}

// ModalProps 인터페이스 정의
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// API 요청 함수 타입 정의
interface SubmitAnswerParams {
  quizId: string;
  answer: number;
  userId: number;
}

interface SubmitPointParams {
  quizId: string;
  point: number;
  userId: number;
}

// API 요청 함수 정의
const submitAnswer = async ({ quizId, answer, userId }: SubmitAnswerParams) => {
  const response = await axios.post(
    '/cs-quiz/answer',
    {
      quizId,
      answer,
      userId,
    },
    { baseURL: process.env.NEXT_PUBLIC_API_URL },
  );
  return response.data.data;
};

const submitPoint = async ({ quizId, point, userId }: SubmitPointParams) => {
  await axios.post(
    '/cs-quiz/point',
    {
      userId,
      quizId,
      points: point,
    },
    { baseURL: process.env.NEXT_PUBLIC_API_URL },
  );
};

// QuizShowModal 컴포넌트 정의
const QuizShowModal: React.FC<ModalProps & QuizData> = ({
  isOpen,
  onClose,
  questionText,
  choices,
  category,
  difficulty,
  id,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrectModalOpen, setIsCorrectModalOpen] = useState(false);
  const [isIncorrectModalOpen, setIsIncorrectModalOpen] = useState(false);
  const queryClient = useQueryClient();

  if (!isOpen) return null;

  // useMutation 훅 설정
  const answerMutation = useMutation({
    mutationFn: submitAnswer,
    onSuccess: (result: string) => {
      queryClient.invalidateQueries();
      if (result === 'CORRECT') {
        setIsCorrectModalOpen(true);
      } else {
        setIsIncorrectModalOpen(true);
      }
    },
    onError: (error: any) => {
      console.error('Failed to submit answer:', error);
    },
  });

  const pointMutation = useMutation({
    mutationFn: submitPoint,
    onError: (error: any) => {
      console.error('Failed to submit point:', error);
    },
  });

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      alert('선택지를 선택해주세요.');
      return;
    }

    answerMutation.mutate({
      quizId: id,
      answer: selectedOption + 1,
      userId: 7,
    });
  };

  const closeCorrectModal = (selectedRate: number | null) => {
    setIsCorrectModalOpen(false);
    if (selectedRate !== null) {
      pointMutation.mutate({
        quizId: id,
        point: selectedRate,
        userId: 7,
      });
    }
    onClose();
  };

  const closeIncorrectModal = () => {
    setIsIncorrectModalOpen(false);
    onClose();
  };

  const difficultyLabel = difficulty === 1 ? 'Level 1' : difficulty === 2 ? 'Level 2' : 'Level 3';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-zinc-900 px-8 rounded-lg shadow-lg relative w-1/2 h-5/6 max-w-5xl max-h-screen overflow-auto flex flex-col justify-start items-center gap-10">
        <button className="absolute top-0 right-0 m-2" onClick={onClose}>
          X
        </button>
        <div className="w-full flex justify-between px-8">
          <h3 className="text-center mt-8 text-xl">{difficultyLabel}</h3>
          <h3 className="text-center mt-8 text-xl">{category}</h3>
        </div>

        <h3 className=" mt-4 text-2xl">{questionText}</h3>
        <div className="flex flex-col w-full mt-9 justify-start items-start">
          {choices.map((choice, index) => (
            <button
              key={index}
              className={`flex justify-start items-center w-2/3 text-center text-xl p-4 rounded-lg ${
                selectedOption === index ? 'bg-slate-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {index + 1}. {choice.choiceText}
            </button>
          ))}
        </div>
        <button
          className="flex justify-center items-center bg-gray-300 rounded-md px-24 py-5"
          onClick={handleSubmitAnswer}
        >
          <h3>제출하기</h3>
        </button>
      </div>

      {isCorrectModalOpen && <CorrectModal onClose={closeCorrectModal} />}
      {isIncorrectModalOpen && <IncorrectModal onClose={closeIncorrectModal} />}
    </div>
  );
};

export default QuizShowModal;
