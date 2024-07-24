import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
  answer: number;
}

const ratings = [
  { value: -2, label: "문제가 이상해요" },
  { value: -1, label: "문제가 별로입니다" },
  { value: 0, label: "보통입니다" },
  { value: 1, label: "좋은 문제입니다" },
  { value: 2, label: "문제를 추천합니다" },
];

const IncorrectModal: React.FC<ModalProps> = ({ onClose, answer }) => {
  const [selectedRate, setSelectedRate] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-3/4 h-3/4 bg-white p-7 rounded shadow-lg">
        <div className="flex items-center justify-between">
          <div></div>
          <h3 className="text-2xl">아쉽네요 ㅜㅜ 오답입니다</h3>
          <button
            onClick={onClose}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            닫기
          </button>
        </div>

        <div>
          <h3 className="text-center text-7xl font-bold">-12점</h3>
          <h3>정답: {answer}</h3>
        </div>
        <div>
          <div className="flex gap-5">
            {ratings.map((rating) => (
              <button
                key={rating.value}
                className={`border-2 p-2 ${
                  selectedRate === rating.value ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setSelectedRate(rating.value)}
              >
                <h3>{rating.label}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncorrectModal;
