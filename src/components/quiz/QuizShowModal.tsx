import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

import { accessTokenAtom } from '@/store/useTokenStore';
import { QuizData, ModalProps, SubmitAnswerParams } from '@/types/quiz/quiz';

interface QuizAnswerResponse {
  data: {
    result: string;
  };
}

import CorrectModal from '../quiz/CorrectModal';
import IncorrectModal from '../quiz/IncorrectModal';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
  const [accessToken] = useAtom(accessTokenAtom);
  const queryClient = useQueryClient();

  const submitAnswer = async ({ quizId, answer }: SubmitAnswerParams) => {
    const response = await axios.post<QuizAnswerResponse>(
      `${apiUrl}cs-quiz/answer`,
      {
        quizId,
        answer,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response);
    return response.data.data;
  };

  const answerMutation = useMutation({
    mutationFn: submitAnswer,
    onSuccess: async (result: string) => {
      await queryClient.invalidateQueries();
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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="relative flex h-5/6 max-h-screen w-1/2 max-w-5xl flex-col items-center justify-start gap-10 overflow-auto rounded-lg bg-zinc-800 px-8 shadow-lg">
        <button className="absolute right-0 top-0 m-2" onClick={onClose}>
          X
        </button>
        <div className="flex w-full justify-between px-8">
          <h3 className="mt-8 text-center text-xl">{difficultyLabel}</h3>
          <h3 className="mt-8 text-center text-xl">{category}</h3>
        </div>

        <h3 className=" mt-4 text-2xl">{questionText}</h3>
        <div className="mt-9 flex w-full flex-col items-start justify-start">
          {choices.map((choice, index) => (
            <button
              key={index}
              className={`flex w-full items-center justify-start rounded-lg p-4 text-center text-xl ${
                selectedOption === index ? 'bg-slate-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {index + 1}. {choice.choiceText}
            </button>
          ))}
        </div>
        <button
          className="bg-gray-300 flex items-center justify-center rounded-md px-24 py-5"
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
