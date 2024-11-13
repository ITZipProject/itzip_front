/* eslint-disable */
import debounce from 'lodash/debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

import { QuizCategories, QuizRatings } from '@/data/QuizData';

const QuizFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 1000),
    [],
  );

  useEffect(() => {
    const difficultyParam = searchParams.get('difficulty')
      ? parseInt(searchParams.get('difficulty')!)
      : null;
    const categoryParam = searchParams.get('category')
      ? parseInt(searchParams.get('category')!)
      : null;
    const searchTermParam = searchParams.get('keyword') ?? '';

    setDifficulty(difficultyParam);
    setCategory(categoryParam);
    setSearchTerm(searchTermParam);
  }, [searchParams]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (difficulty !== null) queryParams.set('difficulty', difficulty.toString());
    if (category !== null) queryParams.set('category', category.toString());
    if (debouncedSearchTerm) queryParams.set('keyword', debouncedSearchTerm);

    router.push(`?${queryParams.toString()}`);
  }, [difficulty, category, debouncedSearchTerm, router]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSetSearchTerm(e.target.value);
  };

  const handleDifficultyChange = (difficulty: number) => {
    setDifficulty(difficulty);
  };

  const handleCategoryChange = (category: number) => {
    setCategory(category);
  };

  const resetFilters = () => {
    setDebouncedSearchTerm('');
    setCategory(null);
    setDifficulty(null);

    const queryParams = new URLSearchParams();
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <div className="flex flex-col">
      <div className="w-[220px] mb-6 flex items-center justify-between px-2">
        <h3 className="text-xl font-semibold">필터</h3>
        <button
          onClick={resetFilters}
          className="bg-gray-700 text-l rounded bg-white px-4 h-[28px] text-slate-700 "
        >
          초기화
        </button>
      </div>
      <div className="flex w-[220px] flex-col rounded-lg border-2 border-gray-700 p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex w-full flex-col gap-8">
            <h3 className="text-xl font-semibold text-gray-500">퀴즈 검색</h3>
            <input
              type="text"
              className="box-border rounded-lg border-none bg-neutral-700 p-4 outline-none placeholder:text-sm placeholder:text-gray-400"
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <div className="my-5 border-b"></div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <h3 className="text-xl font-semibold text-gray-500">난이도</h3>
            {QuizRatings.map((rating) => (
              <label key={rating.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="difficulty"
                  checked={difficulty === rating.value}
                  onChange={() => handleDifficultyChange(rating.value)}
                  className="accent-neutral-800"
                />
                {rating.label}
              </label>
            ))}
            <div className="my-5 border-b"></div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <h3 className="text-xl font-semibold text-gray-500">카테고리</h3>
            {QuizCategories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={category === cat.id}
                  onChange={() => handleCategoryChange(cat.id)}
                  className="accent-neutral-800"
                />
                {cat.categoryname}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizFilter;
