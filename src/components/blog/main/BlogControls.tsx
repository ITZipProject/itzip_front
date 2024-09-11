'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { blogCategories } from '@/data/BlogCategories';

import BlogControlsDropdown from './BlogControlsDropdown';

const BlogControls: React.FC = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('전체');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('선택 필요');
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const sortOptions = ['최신순', '과거순', '조회수순', '추천순'];
  const mainCategories = ['전체', ...Object.keys(blogCategories)];

  useEffect(() => {
    if (selectedMainCategory === '전체') {
      setSubCategories([]);
    } else {
      setSubCategories(blogCategories[selectedMainCategory] || []);
    }
    setSelectedSubCategory('선택 필요');
  }, [selectedMainCategory]);

  const handleMainCategorySelect = (option: string) => {
    setSelectedMainCategory(option);
  };

  const handleSubCategorySelect = (option: string) => {
    setSelectedSubCategory(option);
    console.log(`Selected sub category: ${option}`);
  };

  const handleSortOptionSelect = (option: string) => {
    console.log(`Selected sort option:${option}`);
  };

  return (
    <div className="relative z-40 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-8">
      <div className="flex items-center space-x-10">
        <BlogControlsDropdown
          options={mainCategories}
          selectedOption={selectedMainCategory}
          onSelect={handleMainCategorySelect}
          iconSrc="/icons/common/sub_icon/navigate_down_1.4px.svg"
          textSize="text-lg"
          textWeight="font-medium"
          iconSize={24}
        />
        {selectedMainCategory !== '전체' && (
          <BlogControlsDropdown
            options={subCategories}
            selectedOption={selectedSubCategory}
            onSelect={handleSubCategorySelect}
            iconSrc="/icons/common/sub_icon/navigate_down_1.4px.svg"
            textSize="text-lg"
            textWeight="font-medium"
            iconSize={24}
          />
        )}
      </div>
      <div className="flex items-center">
        <BlogControlsDropdown
          options={sortOptions}
          selectedOption="최신순"
          onSelect={handleSortOptionSelect}
          iconSrc="/icons/common/sub_icon/navigate_down_1.4px.svg"
          textSize="text-md"
          textWeight="font-normal"
          iconSize={20}
        />
        <div className="ml-8 flex items-center space-x-3">
          <Link href="/blog/editor">
            <button className="rounded-xl border border-gray-300 p-2">
              <Image
                src="/icons/blog/whiteMode_WritePen.png"
                alt="Write Post"
                width={20}
                height={20}
              />
            </button>
          </Link>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white">
            내 블로그
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogControls;
