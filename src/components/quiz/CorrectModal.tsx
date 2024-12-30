import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

import { submitPoint } from '@/api/quiz/submitPoint';
import { QUIZ_CONSTANTS } from '@/constants/quiz';
import { ratings } from '@/data/QuizData';
import { tokenAtom } from '@/store/useTokenStore';

interface CorrectModalProps {
  onClose: () => void;
  quizId: string;
}

const CorrectModal: React.FC<CorrectModalProps> = ({ onClose, quizId }) => {
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [token] = useAtom(tokenAtom);

  const pointMutation = useMutation({
    mutationFn: submitPoint,
    onSuccess: () => {
      console.log('점수 제출 성공!');
    },
    onError: (error: any) => {
      console.error('Failed to submit point:', error);
    },
  });

  const handleSubmit = () => {
    if (selectedRate !== null && token.accessToken) {
      pointMutation.mutate({
        quizId,
        point: selectedRate,
        accessToken: token.accessToken,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="flex h-3/4 w-1/2 flex-col items-center justify-center gap-40 rounded-3xl bg-zinc-900 p-7 shadow-lg">
        <div className="flex items-center justify-between">
          <div></div>
          <h3 className="text-4xl font-bold">{QUIZ_CONSTANTS.MODAL_MESSAGES.CORRECT}</h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 ">
          <div className="flex gap-5">
            {ratings.map((rating) => (
              <button
                key={rating.value}
                className={`rounded-lg border border-neutral-500 p-2 ${
                  selectedRate === rating.value ? 'bg-slate-700 text-white' : ''
                }`}
                onClick={() => setSelectedRate(rating.value)}
              >
                <h3 className="text-sm">{rating.label}</h3>
              </button>
            ))}
          </div>
          <button onClick={handleSubmit} className="rounded bg-slate-700 px-20 py-1 text-white">
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorrectModal;
