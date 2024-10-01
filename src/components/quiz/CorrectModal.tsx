import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ratings } from '@/data/QuizData';
import { submitPoint } from '@/api/quiz/submitPoint';

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
        userId: 7,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-1/2 h-3/4 gap-40 bg-zinc-900 p-7 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div></div>
          <h3 className="text-4xl font-bold">정답을 맞추셨네요. 축하드립니다!</h3>
        </div>
        <div className="flex flex-col gap-10 justify-center items-center ">
          <div className="flex gap-5">
            {ratings.map((rating) => (
              <button
                key={rating.value}
                className={`border border-neutral-500 p-2 rounded-lg ${
                  selectedRate === rating.value ? 'bg-slate-700 text-white' : ''
                }`}
                onClick={() => setSelectedRate(rating.value)}
              >
                <h3 className="text-sm">{rating.label}</h3>
              </button>
            ))}
          </div>
          <button onClick={handleSubmit} className="px-20 py-1 bg-slate-700 text-white rounded">
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorrectModal;
