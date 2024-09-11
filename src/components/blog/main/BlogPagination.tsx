import Image from 'next/image';
import React from 'react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2 py-4 pt-8">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="flex items-center rounded-full border border-gray-300 p-2 disabled:opacity-50"
      >
        <Image
          src="/icons/common/sub_icon/navigate_before_1.4px.svg"
          alt="First"
          width={12}
          height={12}
        />
        <Image
          src="/icons/common/sub_icon/navigate_before_1.4px.svg"
          alt="First"
          width={12}
          height={12}
        />
      </button>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center rounded-full border border-gray-300 p-2 disabled:opacity-50"
      >
        <Image
          src="/icons/common/sub_icon/navigate_before_1.4px.svg"
          alt="Previous"
          width={12}
          height={12}
        />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`size-8 text-base font-medium ${
            currentPage === number ? 'bg-gray-200 rounded-full text-black' : 'text-gray-400'
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center rounded-full border border-gray-300 p-2 disabled:opacity-50"
      >
        <Image
          src="/icons/common/sub_icon/navigate_next_1.4px.svg"
          alt="Next"
          width={12}
          height={12}
        />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="flex items-center rounded-full border border-gray-300 p-2 disabled:opacity-50"
      >
        <Image
          src="/icons/common/sub_icon/navigate_next_1.4px.svg"
          alt="Last"
          width={12}
          height={12}
        />
        <Image
          src="/icons/common/sub_icon/navigate_next_1.4px.svg"
          alt="Last"
          width={12}
          height={12}
        />
      </button>
    </div>
  );
};

export default BlogPagination;
