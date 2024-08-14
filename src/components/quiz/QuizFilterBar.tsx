import React, { useState, useEffect } from 'react';

import useQuizFilter from '../../hooks/quiz/useQuizFilter';
import { QuizData } from '@/types/quiz/quiz';

const ratings = [
  { value: 1, label: 'Lv.1' },
  { value: 2, label: 'Lv.2' },
  { value: 3, label: 'Lv.3' },
];

interface QuizFilterBarProps {
  handleFilteredQuizzes: (filteredQuizzes: QuizData[]) => void;
}

const QuizFilterBar = ({ handleFilteredQuizzes }: QuizFilterBarProps) => {
  const {
    filteredAndSortedQuizzes,
    searchTerm,
    category,
    difficulty,
    sortOrder,
    setSearchTerm,
    setDifficulty,
    setCategory,
    resetFilters,
    setSortOrder,
  } = useQuizFilter();

  handleFilteredQuizzes(filteredAndSortedQuizzes);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold">기술퀴즈 둘러보기</h3>

      <div className="flex justify-between  border-gray-600">
        {/* 필터 섹션 */}
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            className="p-2 rounded-lg border-none outline-none box-border placeholder:text-sm placeholder:text-gray-400  bg-neutral-800"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className=" rounded-lg border-none outline-none box-border placeholder:text-sm placeholder:text-gray-400 text-white bg-neutral-800"
            value={difficulty ?? ''}
            onChange={(e) => setDifficulty(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">난이도</option>
            {ratings.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded-lg border-none outline-none box-border placeholder:text-sm placeholder:text-gray-400 text-white bg-neutral-800"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리</option>
            <option value="네트워크">네트워크</option>
            <option value="컴퓨터 과학">컴퓨터 과학</option>
            <option value="프로그래밍">프로그래밍</option>
            <option value="소프트웨어 공학">소프트웨어 공학</option>
            <option value="데이터베이스">데이터베이스</option>
          </select>

          {/* 필터 초기화 버튼 */}
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-700 rounded text-sm text-slate-400"
          >
            필터 초기화
          </button>
        </div>

        {/* 정렬 및 문제 만들기 버튼 섹션 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center h-16 gap-8">
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setSortOrder('latest')}
                disabled={sortOrder === 'latest'}
                className={`py-2 px-4 rounded text-slate-400 ${sortOrder === 'latest' ? 'text-slate-200 font-bold' : ''}`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortOrder('oldest')}
                disabled={sortOrder === 'oldest'}
                className={`py-2 px-4 rounded text-slate-400 ${sortOrder === 'oldest' ? 'text-slate-200 font-bold' : ''}`}
              >
                오래된 순
              </button>
              <button
                onClick={() => setSortOrder('recommended')}
                disabled={sortOrder === 'recommended'}
                className={`py-2 px-4 rounded text-slate-400 ${sortOrder === 'recommended' ? 'text-slate-200 font-bold' : ''}`}
              >
                추천순
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizFilterBar;
