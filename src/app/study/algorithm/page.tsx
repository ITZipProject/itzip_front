'use client';

import React, { useEffect, useState } from 'react';
import TagRank from '../../../components/algorithm/TagRank';
import Main from '../../../components/algorithm/Main';
import MyData from '../../../components/algorithm/MyData';

const algorithmData = [
  { id: 1918, title: '후위 표기식', solvedCount: 1044 },
  { id: 1919, title: '중위 표기식', solvedCount: 945 },
  { id: 1920, title: '전위 표기식', solvedCount: 876 },
  { id: 1921, title: '재귀 함수', solvedCount: 800 },
  { id: 1922, title: '이진 탐색', solvedCount: 750 },
  { id: 1918, title: '후위 표기식', solvedCount: 1044 },
  { id: 1919, title: '중위 표기식', solvedCount: 945 },
  { id: 1920, title: '전위 표기식', solvedCount: 876 },
  { id: 1921, title: '재귀 함수', solvedCount: 800 },
  { id: 1922, title: '이진 탐색', solvedCount: 750 },
  { id: 1918, title: '후위 표기식', solvedCount: 1044 },
  { id: 1919, title: '중위 표기식', solvedCount: 945 },
  { id: 1920, title: '전위 표기식', solvedCount: 876 },
  { id: 1921, title: '재귀 함수', solvedCount: 800 },
  { id: 1922, title: '이진 탐색', solvedCount: 750 },
];

const profileImage = '/userImage.png';

const userData = {
  username: '선구',
  rating: 5,
  solvedCount: 100,
  solvedCountRank: 1,
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex gap-11 w-full h-screen overflow-auto text-white bg-neutral-900">
      <div className="w-1/3 flex flex-col justify-center items-center">
        <div className="w-full m-10">
          <MyData userData={userData} profileImage={profileImage} />
        </div>
        <div className="w-full overflow-auto">
          <TagRank onSearchChange={handleSearchTermChange} />
        </div>
      </div>
      <div className="w-2/3 h-full overflow-auto">
        <Main algorithmData={algorithmData} />
      </div>
    </div>
  );
}
