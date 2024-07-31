import React from 'react';

interface QuizTopBarProps {
  onAddQuiz: () => void;
  sortOrder: 'latest' | 'oldest' | 'recommended';
  setSortOrder: (order: 'latest' | 'oldest' | 'recommended') => void;
}

const QuizTopBar: React.FC<QuizTopBarProps> = ({ onAddQuiz, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-row justify-between items-center h-16 gap-8">
      <div className="flex flex-row gap-2">
        <button
          onClick={() => setSortOrder('latest')}
          disabled={sortOrder === 'latest'}
          className={`py-2 px-4 rounded ${sortOrder === 'latest' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          최신순
        </button>
        <button
          onClick={() => setSortOrder('oldest')}
          disabled={sortOrder === 'oldest'}
          className={`py-2 px-4 rounded ${sortOrder === 'oldest' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          오래된 순
        </button>
        <button
          onClick={() => setSortOrder('recommended')}
          disabled={sortOrder === 'recommended'}
          className={`py-2 px-4 rounded ${sortOrder === 'recommended' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          추천순
        </button>
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
