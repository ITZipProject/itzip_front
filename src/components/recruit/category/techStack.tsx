'use client';

import React, { useState, useEffect } from 'react';
import { Job } from '../job'; // Job 인터페이스가 정의된 파일 경로

interface TechStackProps {
  jobCodes: Job['jobCode'][]; // Job 인터페이스의 jobCode 배열
  selectedTechStacks: string[]; // 선택된 기술 스택 IDs
  onTechStackChange: (selectedTechStacks: string[]) => void; // 기술 스택 변경 핸들러
}

const TechStack: React.FC<TechStackProps> = ({ jobCodes, selectedTechStacks, onTechStackChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTechStacks, setFilteredTechStacks] = useState<Job['jobCode'][]>([]);

  useEffect(() => {
    // jobCodes가 정의되어 있는지 확인하고 필터링합니다.
    if (jobCodes) {
      const filtered = jobCodes.filter((techStack) =>
        techStack.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTechStacks(filtered);
    }
  }, [searchTerm, jobCodes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Enter 키를 눌렀을 때 추가적인 동작을 원하면 여기에 코드를 추가합니다.
    }
  };

  const handleCheckboxChange = (techStackCode: string) => {
    if (selectedTechStacks.includes(techStackCode)) {
      onTechStackChange(selectedTechStacks.filter(code => code !== techStackCode));
    } else {
      onTechStackChange([...selectedTechStacks, techStackCode]);
    }
  };

  return (
    <div className="tech-stack-filter">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="기술 스택 검색"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <div>
        {filteredTechStacks.length > 0 ? (
          filteredTechStacks.map((techStack) => (
            <label key={techStack.code} className="block mb-1">
              <input
                type="checkbox"
                checked={selectedTechStacks.includes(techStack.code)}
                onChange={() => handleCheckboxChange(techStack.code)}
              />
              {techStack.name}
            </label>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TechStack;
