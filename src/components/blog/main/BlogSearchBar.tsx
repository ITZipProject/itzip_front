'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const BlogSearchBar: React.FC = () => {
  const [searchType, setSearchType] = useState('제목');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-blue-50 to-purple-50 p-2">
      <div className="flex items-center">
        <div className="relative mr-6">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="appearance-none border-none bg-transparent py-1 pr-8 font-medium text-gray-400 focus:outline-none focus:ring-0"
          >
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
            <option value="내용">내용</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="grow border-none bg-transparent text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-0"
        />
        <button className="hover:bg-gray-200 rounded-md px-4 py-2 transition-colors duration-200">
          <Image src="/icons/blog/whiteMode_Search.png" alt="Search" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default BlogSearchBar;
