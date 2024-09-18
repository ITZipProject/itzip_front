'use client';

import React, { useState, useRef } from 'react';
import TechStack from './category/techStack';
import RegionCheckboxes from './category/region';
import Search from './category/search';
import Experience from './category/Experience';

interface FiltersProps {
  filters: {
    techName: string;
    locationName: string[];
    experienceMin: number;
    experienceMax: number;
    search: string;
    sort: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps['filters']>>;
  applyFilters: () => void;
}

interface TechStackFilterRef {
  resetSelections: (newSelection: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, applyFilters }) => {
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>(filters.techName ? filters.techName.split(',') : []);
  const techStackRef = useRef<TechStackFilterRef | null>(null);

  const handleTechStackChange = (selected: string[]) => {
    setSelectedTechStacks(selected);
    setFilters(prev => ({ ...prev, techName: selected.join(',') }));
  };

  const handleExperienceChange = (min: number, max: number) => {
    setFilters(prev => ({ ...prev, experienceMin: min, experienceMax: max }));
  };

  const handleRegionChange = (regions: string[]) => {
    setFilters(prev => ({ ...prev, locationName: regions }));
  };

  const handleRemoveTechStack = (techName: string) => {
    const updatedTechStacks = selectedTechStacks.filter(tech => tech !== techName);
    setSelectedTechStacks(updatedTechStacks);
    setFilters(prev => ({ ...prev, techName: updatedTechStacks.join(',') }));
    techStackRef.current?.resetSelections(updatedTechStacks);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const resetFilters = () => {
    setFilters({
      techName: '',
      locationName: [],
      experienceMin: 0,
      experienceMax: 10,
      search: '',
      sort: 'expirationDate,desc',
    });
    setSelectedTechStacks([]);
    techStackRef.current?.resetSelections([]);
  };

  return (
    <div>
      <div className="px-2 flex justify-between mb-4">
        <h2 className="font-pre-heading-03">필터</h2>
        <button
          className="font-pre-heading-03 text-gray-800 rounded hover:bg-blue-300"
          onClick={resetFilters}
        >
          초기화
        </button>
      </div>
      <Search 
        search={filters.search} 
        handleFilterChange={handleSearchChange}
        applyFilters={applyFilters} 
      />
      <div className="mb-4 p-4 border-01 radius-01">
        <h3 className="font-pre-body-01 mb-2">기술 스택</h3>
        {selectedTechStacks.length > 0 && (
          <div className="selected-tech-stacks mb-2">
            {selectedTechStacks.map((techName) => (
              <span key={techName} className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2 inline-block">
                {techName}
                <button 
                  className="ml-1 text-blue-600 font-bold"
                  onClick={() => handleRemoveTechStack(techName)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <TechStack
          ref={techStackRef}
          onSelectionChange={handleTechStackChange}
        />
      </div>
      <div className="mb-4 p-4 border-01 radius-01">
        <h3 className="font-pre-body-01 mb-2">지역</h3>
        <RegionCheckboxes
          selectedRegions={filters.locationName}
          setSelectedRegions={handleRegionChange}
        />
      </div>
      <div className="mb-4 p-4 border-01 radius-01">
        <Experience
          selectedExperienceMin={filters.experienceMin}
          selectedExperienceMax={filters.experienceMax}
          onExperienceChange={handleExperienceChange}
        />
      </div>
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={applyFilters}
      >
        필터 적용
      </button>
    </div>
  );
};

export default Filters;