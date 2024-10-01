'use client';

import React, { useEffect, useState } from 'react';
import TagRank from '../../../components/algorithm/TagRank';
import Main from '../../../components/algorithm/Main';
import MyData from '../../../components/algorithm/MyData';

const profileImage = '/userImage.png';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex gap-11 p-12 w-full h-screen overflow-auto text-white bg-neutral-900">
      <div className="w-1/4 flex flex-col justify-start items-center">
        <div className="w-full  m-10">
          <MyData />
        </div>
        <div className="w-full overflow-auto">
          <TagRank onSearchChange={handleSearchTermChange} />
        </div>
      </div>
      <div className="w-3/4 h-full overflow-auto">
        <Main />
      </div>
    </div>
  );
}
