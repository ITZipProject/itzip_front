'use client';

import React from 'react';
import RegionCheckboxes from '@/components/recruit/region';

interface FiltersProps {
  filters: {
    technology: string;
    location: string;
    education: string;
    experience: string;
    search: string;
    sort: string;
  };
  activeFilter: string | null;
  setFilters: (filters: any) => void;
  toggleFilter: (filterName: string) => void;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  applyFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  activeFilter,
  setFilters,
  toggleFilter,
  handleFilterChange,
  applyFilters,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          className="w-1/3 p-2 border border-gray-300 rounded"
          placeholder="검색어 입력"
        />
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => toggleFilter('technology')}
        >
          기술
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => toggleFilter('location')}
        >
          지역
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => toggleFilter('education')}
        >
          학력
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => toggleFilter('experience')}
        >
          경력
        </button>
      </div>
      {activeFilter === 'technology' && (
        <div className="flex justify-center mb-2">
          <input
            type="text"
            name="technology"
            value={filters.technology}
            onChange={handleFilterChange}
            className="w-1/3 p-2 border border-gray-300 rounded"
            placeholder="기술 입력"
          />
        </div>
      )}
      {activeFilter === 'location' && (
        <div className="flex justify-center mb-2">
          <RegionCheckboxes
            selectedRegion={filters.location}
            setSelectedRegion={(region: string) => setFilters({ ...filters, location: region })}
          />
        </div>
      )}
      {activeFilter === 'education' && (
        <div className="flex justify-center mb-2">
          <select
            name="education"
            value={filters.education}
            onChange={handleFilterChange}
            className="w-1/3 p-2 border border-gray-300 rounded"
          >
            <option value="">학력 선택</option>
            <option value="highschool">고졸</option>
            <option value="college">대졸</option>
            <option value="graduate">대학원</option>
          </select>
        </div>
      )}
      {activeFilter === 'experience' && (
        <div className="flex justify-center mb-2">
          <input
            type="text"
            name="experience"
            value={filters.experience}
            onChange={handleFilterChange}
            className="w-1/3 p-2 border border-gray-300 rounded"
            placeholder="경력 입력"
          />
        </div>
      )}
      <button
        className="block mx-auto mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={applyFilters}
      >
        필터 적용
      </button>
    </div>
  );
};

export default Filters;
