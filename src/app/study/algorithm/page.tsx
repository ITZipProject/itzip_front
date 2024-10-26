'use client';

import React, { useState } from 'react';

import Main from '../../../components/algorithm/Main';
import MyData from '../../../components/algorithm/MyData';
import TagRank from '../../../components/algorithm/TagRank';

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
    <div className="flex w-full gap-11 bg-neutral-800 p-12 text-white">
      <div className="flex w-1/4 flex-col items-center justify-start">
        <section className="m-10 w-full">
          <MyData />
        </section>
        <section className="w-full">
          <TagRank onTagClick={handleTagClick} />
        </section>
      </div>
      <section className="h-full w-3/4">
        <Main tagId={tagId} displayName={displayName} resetTag={resetTag} />
      </section>
    </div>
  );
};

export default Home;
