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
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

const RegionCheckboxes: React.FC<Props> = ({ selectedRegion, setSelectedRegion }) => {
  return (
    <div className="container flex flex-col w-64">
      {regions.map(region => (
        <div className="region mb-2" key={region.id}>
          <input
            type="radio"
            id={region.id}
            name="region"
            value={region.name}
            checked={selectedRegion === region.name}
            onChange={() => setSelectedRegion(region.name)}
            className="mr-2"
          />
          <label htmlFor={region.id} className="inline-block">
            {region.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RegionCheckboxes;
