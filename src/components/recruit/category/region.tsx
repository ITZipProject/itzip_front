import React from 'react';

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

interface Props {
  selectedRegions: string[];
  setSelectedRegions: (regions: string[]) => void;
}

const RegionCheckboxes: React.FC<Props> = ({ selectedRegions, setSelectedRegions }) => {
  const handleRegionChange = (regionName: string) => {
    if (selectedRegions.includes(regionName)) {
      setSelectedRegions(selectedRegions.filter(r => r !== regionName));
    } else {
      setSelectedRegions([...selectedRegions, regionName]);
    }
  };

  const handleRemoveRegion = (regionName: string) => {
    setSelectedRegions(selectedRegions.filter(r => r !== regionName));
  };

  return (
    <div className="container flex flex-col w-64">
      {selectedRegions.length > 0 && (
        <div className="selected-regions mb-4">
          <h4 className="font-bold mb-2">선택된 지역:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedRegions.map(region => (
              <span key={region} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {region}
                <button 
                  onClick={() => handleRemoveRegion(region)}
                  className="ml-2 text-blue-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
      {regions.map((region) => (
        <div className="region mb-2" key={region.id}>
          <input
            type="checkbox"
            id={region.id}
            value={region.name}
            checked={selectedRegions.includes(region.name)}
            onChange={() => handleRegionChange(region.name)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor={region.id} className="inline-block cursor-pointer">
            {region.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RegionCheckboxes;