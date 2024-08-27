import React from 'react';

interface PaginationButtonsProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (newPage: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const buttons = [];

  for (let i = 0; i < totalPages; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`px-4 py-2 rounded text-sm ${
          currentPage === i ? 'bg-gray-600 text-white' : 'bg-gray-700 text-slate-400'
        }`}
      >
        {i + 1}
      </button>,
    );
  }

  return <div className="flex justify-center gap-2 mt-4 items-center">{buttons}</div>;
};

export default PaginationButtons;
