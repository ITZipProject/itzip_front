'use client';
import React from 'react';

import BlogSearchBar from './BlogSearchBar';
import RollingCounter from './RollingCounter';

const BlogHeader: React.FC = () => {
  const postCount = 723234512; //글 개수. 임시임. 후에 백엔드로 받을 예정.

  return (
    <div className="mx-auto mb-6 mt-12 flex w-full max-w-3xl flex-col items-center">
      <div className="mb-6 flex flex-col">
        <div className="whitespace-nowrap text-2xl">
          <RollingCounter endValue={postCount} />
          <span className="ml-1 text-black">개의 새로운 글을 살펴보세요.</span>
        </div>
      </div>
      <BlogSearchBar />
    </div>
  );
};

export default BlogHeader;
