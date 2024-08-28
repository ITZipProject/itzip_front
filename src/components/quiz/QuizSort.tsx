import React, { useState, useEffect } from 'react';
import { QuizData } from '@/types/quiz/quiz';
import { useFilteredQuizzes } from '@/api/quiz/fetchQuizzes';
import PaginationButtons from './PaginationButtons';
import { useRouter, useSearchParams } from 'next/navigation';
import MakeQuizModal from './MakeQuizModal';

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
    <div className="w-full flex flex-col gap-10 mb-10">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold">기술퀴즈 둘러보기</h3>
        <div className="flex justify-center items-center">
          <div
            onClick={handleAddQuiz}
            className="flex items-center justify-center  bg-color-button-primary  rounded-lg cursor-pointer p-3"
          >
            <h3 className=" text-white justify-center items-center">+ 문제 생성하기</h3>
          </div>
          {isModalOpen && <MakeQuizModal isOpen={isModalOpen} onClose={closeModal} />}
        </div>
      </div>
      <div className="border-b"></div>

      <div className="w-full flex justify-between border-gray-600">
        <div className="w-1/3"></div>
        <div className="w-1/3 flex justify-center gap-2 items-center">
          <PaginationButtons totalPages={totalPages} />
        </div>
        <div className="w-1/3 flex justify-center items-center">
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
  );
};

export default QuizSort;
