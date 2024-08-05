'use client';

import React from 'react';

interface SearchProps {
  search: string;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyFilters: () => void;
}

const Search: React.FC<SearchProps> = ({ search, handleFilterChange, applyFilters }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters(); 
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleFilterChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="검색어 입력"
      />
    </div>
  );
};

export default Search;
