'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface Region {
  id: string;
  name: string;
}

const regions: Region[] = [
  { id: '101000', name: '서울' },
  { id: '102000', name: '경기' },
  { id: '108000', name: '인천' },
  { id: '106000', name: '부산' },
  { id: '105000', name: '대전' },
  { id: '104000', name: '대구' },
  { id: '103000', name: '광주' },
  { id: '107000', name: '울산' },
  { id: '109000', name: '강원' },
  { id: '110000', name: '경남' },
  { id: '111000', name: '경북' },
  { id: '112000', name: '전남' },
  { id: '113000', name: '전북' },
  { id: '114000', name: '충북' },
  { id: '115000', name: '충남' },
  { id: '116000', name: '제주' },
  { id: '117000', name: '전국' },
  { id: '118000', name: '세종' },
];

interface RegionCheckboxesProps {
  selectedLocationCode: string;
  onRegionChange: (selected: string) => void;
}

export interface RegionCheckboxesRef {
  resetSelections: (newSelection: string) => void;
}

const RegionCheckboxes = forwardRef<RegionCheckboxesRef, RegionCheckboxesProps>(
  ({ selectedLocationCode = '', onRegionChange }, ref) => {
    const [selectedRegion, setSelectedRegion] = useState<string>(selectedLocationCode);
    const [isExpanded, setIsExpanded] = useState(false);
    const INITIAL_DISPLAY_COUNT = 6;

    useEffect(() => {
      setSelectedRegion(selectedLocationCode);
    }, [selectedLocationCode]);

    useImperativeHandle(ref, () => ({
      resetSelections: (newSelection: string) => {
        setSelectedRegion(newSelection);
      },
    }));

    const handleRegionChange = (regionId: string) => {
      const updatedSelection = selectedRegion === regionId ? '' : regionId;
      setSelectedRegion(updatedSelection);
      onRegionChange(updatedSelection);
    };

    const displayedRegions = isExpanded ? regions : regions.slice(0, INITIAL_DISPLAY_COUNT);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {displayedRegions.map((region) => (
            <div
              key={region.id}
              className="flex items-center space-x-2 rounded-lg p-2 transition-colors hover:bg-blue-50"
            >
              <input
                type="checkbox"
                id={region.id}
                checked={selectedRegion?.startsWith(region.id.substring(0, 3))}
                onChange={() => handleRegionChange(region.id)}
                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={region.id}
                className="cursor-pointer text-sm font-medium text-gray-700"
              >
                {region.name}
              </label>
            </div>
          ))}
        </div>

        {regions.length > INITIAL_DISPLAY_COUNT && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full items-center justify-center p-2 text-sm text-blue-600 transition-colors hover:text-blue-800"
          >
            {isExpanded ? (
              <>
                <span>접기</span>
                <ChevronUp className="ml-1 size-4" />
              </>
            ) : (
              <>
                <span>더보기</span>
                <ChevronDown className="ml-1 size-4" />
              </>
            )}
          </button>
        )}
      </div>
    );
  },
);

RegionCheckboxes.displayName = 'RegionCheckboxes';

export default RegionCheckboxes;
