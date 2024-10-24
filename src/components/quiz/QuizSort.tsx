'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { useFilteredQuizzes } from '@/api/quiz/fetchQuizzes';
import { QuizData } from '@/types/quiz/quiz';

import MakeQuizModal from './MakeQuizModal';
import PaginationButtons from './PaginationButtons';

interface QuizSortProps {
  handleFilteredQuizzes: (filteredQuizzes: QuizData[]) => void;
}

const QuizSort = ({ handleFilteredQuizzes }: QuizSortProps) => {
  const [sortOrder, setSortOrder] = useState<'NEWEST' | 'OLDEST' | 'RECOMMENDED'>('NEWEST');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sortOrderParam = searchParams.get('sortOrder');
    const pageParam = searchParams.get('page');

    setSortOrder((sortOrderParam as 'NEWEST' | 'OLDEST' | 'RECOMMENDED') ?? 'NEWEST');
    setPage(pageParam ? parseInt(pageParam) : 0);
  }, [searchParams]);

  const updateURLParams = (newSortOrder?: string, newPage?: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (newSortOrder !== undefined) {
      currentParams.set('sortOrder', newSortOrder);
    }

    if (newPage !== undefined) {
      currentParams.set('page', newPage.toString());
    }

    router.push(`?${currentParams.toString()}`);
  };

  useEffect(() => {
    updateURLParams(sortOrder, page);
  }, [sortOrder, page]);

  const { data } = useFilteredQuizzes();

  useEffect(() => {
    if (data) {
      handleFilteredQuizzes(data.content);
      setTotalPages(data.page.totalPages);
    }
  }, [data]);

  const handleAddQuiz = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mb-10 flex w-full flex-col gap-10 px-4 sm:px-6 lg:px-8">
      {/* 헤더 섹션 */}
      <div className="flex flex-row items-center justify-between gap-5">
        <h3 className="whitespace-nowrap text-2xl font-bold sm:text-3xl">기술퀴즈 둘러보기</h3>
        <div className="flex items-center justify-center space-x-4">
          <div
            onClick={handleAddQuiz}
            className="flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-color-button-primary p-3"
          >
            <h3 className="text-sm text-white sm:text-base">+ 문제 생성하기</h3>
          </div>
          {isModalOpen && <MakeQuizModal isOpen={isModalOpen} onClose={closeModal} />}
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-b border-gray-600"></div>

      {/* 정렬 및 페이징 섹션 */}
      <div className="mt-4 flex w-full flex-row flex-wrap items-center justify-between border-gray-600">
        {/* 빈 공간 */}
        <div className="mb-4 flex w-full justify-center sm:mb-0 sm:w-1/3 sm:justify-start"></div>

        {/* 페이징 버튼 */}
        <div className="mb-4 flex w-full justify-center gap-4 sm:mb-0 sm:w-1/3">
          <PaginationButtons totalPages={totalPages} />
        </div>

        {/* 정렬 버튼 */}
        <div className="flex w-full items-center justify-center gap-4 sm:w-1/3 sm:justify-end">
          <button
            onClick={() => setSortOrder('NEWEST')}
            disabled={sortOrder === 'NEWEST'}
            className={`rounded px-4 py-2 text-slate-400 ${
              sortOrder === 'NEWEST' ? 'font-bold text-slate-200' : ''
            } whitespace-nowrap text-sm sm:text-base`}
          >
            최신순
          </button>
          <button
            onClick={() => setSortOrder('OLDEST')}
            disabled={sortOrder === 'OLDEST'}
            className={`rounded px-4 py-2 text-slate-400 ${
              sortOrder === 'OLDEST' ? 'font-bold text-slate-200' : ''
            } whitespace-nowrap text-sm sm:text-base`}
          >
            오래된 순
          </button>
          <button
            onClick={() => setSortOrder('RECOMMENDED')}
            disabled={sortOrder === 'RECOMMENDED'}
            className={`rounded px-4 py-2 text-slate-400 ${
              sortOrder === 'RECOMMENDED' ? 'font-bold text-slate-200' : ''
            } whitespace-nowrap text-sm sm:text-base`}
          >
            추천순
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSort;
