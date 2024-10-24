import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

import { submitPoint } from '@/api/quiz/submitPoint';
import { ratings } from '@/data/QuizData';

interface CorrectModalProps {
  onClose: () => void;
  quizId: string;
}

const CorrectModal: React.FC<CorrectModalProps> = ({ onClose, quizId }) => {
  const [selectedRate, setSelectedRate] = useState<number | null>(null);

  const pointMutation = useMutation({
    mutationFn: submitPoint,
    onError: (error: any) => {
      console.error('Failed to submit point:', error);
    },
  });

  const handleSubmit = () => {
    if (selectedRate !== null) {
      pointMutation.mutate({
        quizId,
        point: selectedRate,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-3/4 w-1/2 flex-col items-center justify-center gap-40 rounded-3xl bg-zinc-900 p-7 shadow-lg">
        <div className="flex items-center justify-between">
          <div></div>
          <h3 className="text-4xl font-bold">정답을 맞추셨네요. 축하드립니다!</h3>
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
