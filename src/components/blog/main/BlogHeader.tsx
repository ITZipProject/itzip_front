'use client';
import React, { useState, useEffect } from 'react';

import { blogCategories, CategoryType, getAllSubcategories } from '@/data/BlogCategories';
import { CarouselItem } from '@/types/blog/common';

import BlogCarousel from './BlogCarousel';
import RollingCounter from './RollingCounter';

const generateRandomCarouselItems = (count: number): CarouselItem[] => {
  const subcategories = getAllSubcategories();
  return Array.from({ length: count }, (_, i) => {
    const subCategory = subcategories[Math.floor(Math.random() * subcategories.length)];
    const category =
      (Object.keys(blogCategories).find((key) =>
        blogCategories[key as keyof CategoryType].includes(subCategory),
      ) as keyof CategoryType) || '기타';
    return {
      id: i + 1,
      imageUrl: `https://picsum.photos/seed/${i + 1}/1280/400`,
      title: `블로그 포스트 제목 ${i + 1}`,
      content: `서류 합격률을 높인 단 한가지 비법 : 멘티 인터뷰 입니다. 서류 합격률을 높은 단 한가지 비법 : 멘티 인터뷰 입니다.`,
      category,
      subCategory,
      link: `/blog/post/${i + 1}`, // 링크 추가
    };
  });
};

const BlogHeader: React.FC = () => {
  const postCount = 723234512; // 글 개수. 임시임. 후에 백엔드로 받을 예정.
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    setCarouselItems(generateRandomCarouselItems(7));
  }, []);

  return (
    <div>
      <div className="mx-auto mb-6 mt-12 flex w-full max-w-3xl flex-col items-center">
        <div className="whitespace-nowrap text-2xl">
          <RollingCounter endValue={postCount} />
          <span className="ml-1 text-black">개의 새로운 글을 살펴보세요.</span>
        </div>
      </div>
      {carouselItems.length > 0 && <BlogCarousel items={carouselItems} />}
    </div>
  );
};

export default BlogHeader;
