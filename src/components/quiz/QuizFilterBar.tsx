import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { QuizCategories, QuizrRatings } from '@/data/QuizData';
import { QuizData } from '@/types/quiz/quiz';
import { useFilteredQuizzes } from '@/api/quiz/fetchQuizzes';
import PaginationButtons from './PaginationButtons';

interface QuizFilterBarProps {
  handleFilteredQuizzes: (filteredQuizzes: QuizData[]) => void;
}

const QuizFilterBar = ({ handleFilteredQuizzes }: QuizFilterBarProps) => {
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [category, setCategory] = useState<number | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [sortOrder, setSortOrder] = useState<'NEWEST' | 'OLDEST' | 'RECOMMENDED'>('NEWEST');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 1000),
    [],
  );

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSetSearchTerm(e.target.value);
  };

  const { data } = useFilteredQuizzes({
    difficulty,
    category,
    sortOrder,
    page,
    keyword: debouncedSearchTerm,
  });

  useEffect(() => {
    if (data) {
      handleFilteredQuizzes(data.content);
      setTotalPages(data.page.totalPages);
    }
  }, [data]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('');
    setDifficulty(null);
    setSortOrder('NEWEST');
    setPage(0);
    setDebouncedSearchTerm('');
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold">기술퀴즈 둘러보기</h3>

      <div className="flex justify-between border-gray-600">
        {/* 필터 섹션 */}
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            className="p-2 rounded-lg border-none outline-none box-border placeholder:text-sm placeholder:text-gray-400 bg-neutral-800"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />

          <select
            className="rounded-lg border-none outline-none box-border placeholder:text-sm placeholder:text-gray-400 text-white bg-neutral-800"
            value={difficulty ?? ''}
            onChange={(e) => setDifficulty(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">난이도</option>
            {QuizrRatings.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded-lg border-none outline-none box-border placeholder:text-sm placeholder:text-gray-400 text-white bg-neutral-800"
            value={category}
            onChange={(e) => {
              const selectedValue = e.target.value ? parseInt(e.target.value) : '';
              setCategory(selectedValue);
            }}
          >
            <option value="">카테고리</option>
            {QuizCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryname}
              </option>
            ))}
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
                onClick={() => setSortOrder('NEWEST')}
                disabled={sortOrder === 'NEWEST'}
                className={`py-2 px-4 rounded text-slate-400 ${sortOrder === 'NEWEST' ? 'text-slate-200 font-bold' : ''}`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortOrder('OLDEST')}
                disabled={sortOrder === 'OLDEST'}
                className={`py-2 px-4 rounded text-slate-400 ${sortOrder === 'OLDEST' ? 'text-slate-200 font-bold' : ''}`}
              >
                오래된 순
              </button>
              <button
                onClick={() => setSortOrder('RECOMMENDED')}
                disabled={sortOrder === 'RECOMMENDED'}
                className={`py-2 px-4 rounded text-slate-400 ${sortOrder === 'RECOMMENDED' ? 'text-slate-200 font-bold' : ''}`}
              >
                추천순
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4 items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-700 rounded text-sm text-slate-400"
        >
          이전
        </button>

        <PaginationButtons
          totalPages={totalPages}
          currentPage={page}
          handlePageChange={handlePageChange}
        />

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
          className="px-4 py-2 bg-gray-700 rounded text-sm text-slate-400"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default QuizFilterBar;
