import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import CorrectModal from '../quiz/CorrectModal';
import IncorrectModal from '../quiz/IncorrectModal';
import { QuizData, ModalProps, SubmitAnswerParams } from '@/types/quiz/quiz';

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

  const closeCorrectModal = () => {
    setIsCorrectModalOpen(false);
    onClose();
  };

  const closeIncorrectModal = () => {
    setIsIncorrectModalOpen(false);
    onClose();
  };

  const difficultyLabel = difficulty === 1 ? 'Level 1' : difficulty === 2 ? 'Level 2' : 'Level 3';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-zinc-800 px-8 rounded-lg shadow-lg relative w-1/2 h-5/6 max-w-5xl max-h-screen overflow-auto flex flex-col justify-start items-center gap-10">
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
              className={`flex justify-start items-center w-full text-center text-xl p-4 rounded-lg ${
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

      {isCorrectModalOpen && <CorrectModal onClose={closeCorrectModal} quizId={id} />}
      {isIncorrectModalOpen && <IncorrectModal onClose={closeIncorrectModal} />}
    </div>
  );
};

export default QuizShowModal;
