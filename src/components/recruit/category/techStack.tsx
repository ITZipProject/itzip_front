import React, { useState, useEffect } from 'react';
import { TechStack, loadTechStacks } from '../../../utils/techStacksLoader';

interface TechStackFilterProps {
  onSelectionChange?: (selected: string[]) => void;  // 옵셔널로 변경
}

const TechStackFilter: React.FC<TechStackFilterProps> = ({ onSelectionChange }) => {
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (techId: string) => {
    const updatedSelection = selectedTechStacks.includes(techId)
      ? selectedTechStacks.filter(id => id !== techId)
      : [...selectedTechStacks, techId];
    
    setSelectedTechStacks(updatedSelection);
    if (onSelectionChange) {  // 함수가 존재하는 경우에만 호출
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
        className="search-input"
      />
      <div className="tech-list">
        {searchTerm.trim() === '' ? (
          <p>기술 스택을 검색해 보세요</p>
        ) : filteredTechStacks.length > 0 ? (
          filteredTechStacks.map(tech => (
            <div key={tech.id} className="tech-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedTechStacks.includes(tech.id)}
                  onChange={() => handleSelect(tech.id)}
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
};

export default TechStackFilter;