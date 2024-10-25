'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface Region {
  id: string;
  name: string;
}

const regions: Region[] = [
  { id: 'seoul', name: '서울' },
  { id: 'incheon', name: '인천' },
  { id: 'daegu', name: '대구' },
  { id: 'daejeon', name: '대전' },
  { id: 'sejong', name: '세종' },
  { id: 'gyeonggi', name: '경기' },
  { id: 'busan', name: '부산' },
  { id: 'gwangju', name: '광주' },
  { id: 'ulsan', name: '울산' },
  { id: 'gangwon', name: '강원' },
  { id: 'gyeongnam', name: '경남' },
  { id: 'gyeongbuk', name: '경북' },
  { id: 'jeonnam', name: '전남' },
  { id: 'jeonbuk', name: '전북' },
  // Add more regions as needed
];

interface RegionCheckboxesProps {
  onSelectionChange?: (selected: string[]) => void;
}

export interface RegionCheckboxesRef {
  resetSelections: (newSelection: string[]) => void;
}

const RegionCheckboxes = forwardRef<RegionCheckboxesRef, RegionCheckboxesProps>(({ onSelectionChange }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRegions, setFilteredRegions] = useState<Region[]>(regions);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRegions(regions);
    } else {
      const filtered = regions.filter(region =>
        region.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRegions(filtered);
    }
  }, [searchTerm]);

  useImperativeHandle(ref, () => ({
    resetSelections: (newSelection: string[]) => {
      setSelectedRegions(newSelection);
    }
  }));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (regionName: string) => {
    const updatedSelection = selectedRegions.includes(regionName)
      ? selectedRegions.filter(r => r !== regionName)
      : [...selectedRegions, regionName];
    
    setSelectedRegions(updatedSelection);
    if (onSelectionChange) {
      onSelectionChange(updatedSelection);
    }
  };

  return (
    <div className="region-checkboxes">
      <div className="region-list">
        {filteredRegions.map((region) => (
          <div className="region mb-2" key={region.id}>
            <label className="flex items-center">
              <input
                type="checkbox"
                id={region.id}
                value={region.name}
                checked={selectedRegions.includes(region.name)}
                onChange={() => handleRegionChange(region.name)}
                className="mr-2 cursor-pointer"
              />
              {region.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
});

RegionCheckboxes.displayName = 'RegionCheckboxes';

export default RegionCheckboxes;
