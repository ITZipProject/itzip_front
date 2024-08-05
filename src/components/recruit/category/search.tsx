'use client';

import React from 'react';

interface SearchProps {
  search: string;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyFilters: () => void; // applyFilters 함수 추가
}

const Search: React.FC<SearchProps> = ({ search, handleFilterChange, applyFilters }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters(); // 엔터 키를 누르면 applyFilters 함수 호출
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleFilterChange}
        onKeyDown={handleKeyDown} // onKeyDown 이벤트 추가
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="검색어 입력"
      />
    </div>
  );
};

export default Search;
