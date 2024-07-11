"use client";

import React from "react";

interface QuizTopBarProps {
  onAddQuiz: () => void;
}

const QuizTopBar: React.FC<QuizTopBarProps> = ({ onAddQuiz }) => {
  return (
    <div className="flex flex-row justify-between items-center h-16 gap-8">
      <div className="flex flex-row gap-2">
        <button>최신순</button>
        <button>오래된 순</button>
        <button>추천순</button>
      </div>
      <div>
        <button
          className="border border-gray-400 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={onAddQuiz}
        >
          문제 만들기
        </button>
      </div>
    </div>
  );
};

export default QuizTopBar;
