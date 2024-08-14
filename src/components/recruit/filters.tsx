'use client';

import React from 'react';
import RegionCheckboxes from './category/region';
import Search from './category/search';

interface FiltersProps {
  filters: {
    technology: string;
    location: string;
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
    <div className="">
      <div className="px-2 flex justify-between mb-4">
        <h2 className="font-bold">필터</h2>
        <button
          className="bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={() => {
            setFilters({
              technology: '',
              location: '',
              experience: '',
              search: '',
              sort: 'latest',
            });
            applyFilters();
          }}
        >
          초기화
        </button>
      </div>
      <Search search={filters.search} handleFilterChange={handleFilterChange} applyFilters={applyFilters} />
      <div className="mb-4 p-4 border border-gray-300 rounded-lg">
        <h3 className="font-semibold mb-2">기술 스택</h3>
        <input
          type="text"
          name="technology"
          value={filters.technology}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="기술을 입력하세요"
        />
        <div className="mt-2">
          <label className="block mb-1">
            <input
              type="checkbox"
              name="label1"
              checked={filters.technology.includes('label1')}
              onChange={handleFilterChange}
            />
            label1
          </label>
          <label className="block mb-1">
            <input
              type="checkbox"
              name="label2"
              checked={filters.technology.includes('label2')}
              onChange={handleFilterChange}
            />
            label2
          </label>
          {/* Add more labels as needed */}
        </div>
      </div>
      <div className="mb-4 p-4 border border-gray-300 rounded-lg">
        <h3 className="font-semibold mb-2">지역</h3>
        <RegionCheckboxes
          selectedRegion={filters.location}
          setSelectedRegion={(region: string) => setFilters({ ...filters, location: region })}
        />
      </div>
      <div className="mb-4 p-4 border border-gray-300 rounded-lg">
        <h3 className="font-semibold mb-2">경력</h3>
        <input
          type="text"
          name="experience"
          value={filters.experience}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="경력을 입력하세요"
        />
      </div>
      <button
        className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" // Modified button color
        onClick={applyFilters}
      >
        필터 적용
      </button>
    </div>
  );
};

export default Filters;
