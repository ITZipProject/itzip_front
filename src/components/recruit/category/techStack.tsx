'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { TechStack, loadTechStacks } from '../../../utils/techStacksLoader';

interface TechStackFilterProps {
  onSelectionChange?: (selected: string[]) => void;
}

export interface TechStackFilterRef {
  resetSelections: (newSelection: string[]) => void;
}

const TechStackFilter = forwardRef<TechStackFilterRef, TechStackFilterProps>(({ onSelectionChange }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [filteredTechStacks, setFilteredTechStacks] = useState<TechStack[]>([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);

  useEffect(() => {
    setTechStacks(loadTechStacks());
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTechStacks([]);
    } else {
      const filtered = techStacks.filter(tech =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTechStacks(filtered);
    }
  }, [searchTerm, techStacks]);

  useImperativeHandle(ref, () => ({
    resetSelections: (newSelection: string[]) => {
      setSelectedTechStacks(newSelection);
    }
  }));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (techName: string) => {
    const updatedSelection = selectedTechStacks.includes(techName)
      ? selectedTechStacks.filter(name => name !== techName)
      : [...selectedTechStacks, techName];
    
    setSelectedTechStacks(updatedSelection);
    if (onSelectionChange) {
      onSelectionChange(updatedSelection);
    }
  };

  return (
    <div className="tech-stack-filter">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="기술을 입력하세요"
        className="search-input w-full p-2 border border-gray-300 rounded mb-2"
      />
      <div className="tech-list">
        {searchTerm.trim() === '' ? (
          <p>기술 스택을 검색해 보세요</p>
        ) : filteredTechStacks.length > 0 ? (
          filteredTechStacks.map(tech => (
            <div key={tech.id} className="tech-item mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTechStacks.includes(tech.name)}
                  onChange={() => handleSelect(tech.name)}
                  className="mr-2"
                />
                {tech.name}
              </label>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다</p>
        )}
      </div>
    </div>
  );
});

TechStackFilter.displayName = 'TechStackFilter';

export default TechStackFilter;