'use client';

import React, { useState } from 'react';
import TagRank from '../../../components/algorithm/TagRank';
import Main from '../../../components/algorithm/Main';
import MyData from '../../../components/algorithm/MyData';

const Home: React.FC = () => {
  const [tagId, setTagId] = useState<number | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);

  const handleTagClick = (selectedTagId: number, selectedDisplayName: string) => {
    setTagId(selectedTagId);
    setDisplayName(selectedDisplayName);
  };

  const resetTag = () => {
    setTagId(undefined);
    setDisplayName(undefined);
  };

  return (
    <div className="flex gap-11 p-12 w-full text-white bg-neutral-800">
      <div className="w-1/4 flex flex-col justify-start items-center">
        <section className="w-full m-10">
          <MyData />
        </section>
        <section className="w-full">
          <TagRank onTagClick={handleTagClick} />
        </section>
      </div>
      <section className="w-3/4 h-full">
        <Main tagId={tagId} displayName={displayName} resetTag={resetTag} />
      </section>
    </div>
  );
};

export default Home;
