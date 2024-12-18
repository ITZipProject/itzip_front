/* eslint-disable */
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface PaginationButtonsProps {
  totalPages: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ totalPages }) => {
  const [page, setPage] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    updateURLParams(page);
  }, [page]);

  const updateURLParams = (newPage?: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (newPage !== undefined) {
      currentParams.set('page', newPage.toString());
    }

    router.push(`?${currentParams.toString()}`);
  };

  const buttons = [];

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };
  for (let i = 0; i < totalPages; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`rounded  px-4 text-sm ${
          page === i ? 'bg-gray-600 text-white' : 'bg-gray-700 text-slate-400'
        }`}
      >
        {i + 1}
      </button>,
    );
  }

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 0}
        className="bg-gray-700 rounded px-4 text-sm text-slate-400"
      >
        이전
      </button>
      <div className="flex  gap-2 ">{buttons}</div>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages - 1}
        className="bg-gray-700 rounded px-4 py-2 text-sm text-slate-400"
      >
        다음
      </button>
    </div>
  );
};

export default PaginationButtons;
