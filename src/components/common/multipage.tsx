import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="my-4 flex items-center justify-center space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-50"
      >
        &lt;
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`flex size-8 items-center justify-center
            ${currentPage === number ? 'font-bold text-gray-900' : 'font-normal text-gray-400'}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
