'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

import Main from '../../../components/algorithm/Main';
import MyData from '../../../components/algorithm/MyData';
import TagRank from '../../../components/algorithm/TagRank';
const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full flex-col gap-11 bg-neutral-800 text-white sm:flex sm:flex-row sm:p-12">
        <div className="flex flex-col items-center justify-start sm:w-1/4 md:w-spacing-20">
          <section className="m-10 flex w-full items-center justify-center ">
            <MyData />
          </section>
          <section className="md:w-spacing-20 lg:w-spacing-21">
            <TagRank onTagClick={handleTagClick} />
          </section>
        </div>
        <section className="h-full sm:w-3/4">
          <Main tagId={tagId} displayName={displayName} resetTag={resetTag} />
        </section>
      </div>
    </QueryClientProvider>
  );
};

export default Home;
