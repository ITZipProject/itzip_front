'use client';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { blogFilterAtom } from '@/store/blogFilterAtom';
import { categoryMappings } from '@/types/blog/category';
import { SortType } from '@/types/blog/common';

import BlogControlsDropdown from './BlogControlsDropdown';

const BlogControls: React.FC = () => {
  const [filter, setFilter] = useAtom(blogFilterAtom);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('전체');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('선택 필요');
  const [subCategories, setSubCategories] = useState<string[]>([]);

  // 메인 카테고리와 서브 카테고리 목록 생성
  const mainCategories = [
    '전체',
    ...categoryMappings
      .map((cat) => cat.mainCategory)
      .filter((value, index, self) => self.indexOf(value) === index),
  ];

  const sortOptions = [
    { display: '최신순', value: 'NEWEST' },
    { display: '과거순', value: 'OLDEST' },
    { display: '조회수순', value: 'VIEWCOUNT' },
    { display: '추천순', value: 'LIKECOUNT' },
  ];

  // 메인 카테고리가 변경될 때 서브 카테고리 업데이트
  useEffect(() => {
    if (selectedMainCategory === '전체') {
      setSubCategories([]);
      setFilter((prev) => ({ ...prev, categoryId: undefined }));
    } else {
      const filteredSubCategories = categoryMappings
        .filter((cat) => cat.mainCategory === selectedMainCategory)
        .map((cat) => cat.subCategory);
      setSubCategories(filteredSubCategories);
    }
    setSelectedSubCategory('선택 필요');
  }, [selectedMainCategory, setFilter]);

  const handleMainCategorySelect = (option: string) => {
    setSelectedMainCategory(option);
  };

  const handleSubCategorySelect = (option: string) => {
    setSelectedSubCategory(option);
    const selectedCategory = categoryMappings.find(
      (cat) => cat.mainCategory === selectedMainCategory && cat.subCategory === option,
    );
    setFilter((prev) => ({
      ...prev,
      categoryId: selectedCategory?.id,
      page: 0, // 카테고리 변경 시 페이지 리셋
    }));
  };

  const handleSortOptionSelect = (option: string) => {
    const sortType = sortOptions.find((sort) => sort.display === option)?.value as SortType;
    setFilter((prev) => ({
      ...prev,
      sortType,
      page: 0, // 정렬 변경 시 페이지 리셋
    }));
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
          options={sortOptions.map((opt) => opt.display)}
          selectedOption={
            sortOptions.find((opt) => opt.value === filter.sortType)?.display || '최신순'
          }
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
