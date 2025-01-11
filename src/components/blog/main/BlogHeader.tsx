'use client';
import React, { useState, useEffect } from 'react';

import { categoryMappings } from '@/types/blog/category';
import { CarouselItem, PostCountResponse } from '@/types/blog/common';

import BlogCarousel from './BlogCarousel';
import RollingCounter from './RollingCounter';

const generateRandomCarouselItems = (count: number): CarouselItem[] => {
  // categoryMappings에서 카테고리 정보 활용
  return Array.from({ length: count }, (_, i) => {
    const randomCategory = categoryMappings[Math.floor(Math.random() * categoryMappings.length)];

    return {
      id: i + 1,
      imageUrl: `https://picsum.photos/seed/${i + 1}/1280/400`,
      title: `블로그 포스트 제목 ${i + 1}`,
      content: `서류 합격률을 높인 단 한가지 비법 : 멘티 인터뷰 입니다. 서류 합격률을 높은 단 한가지 비법 : 멘티 인터뷰 입니다.`,
      category: randomCategory.mainCategory,
      subCategory: randomCategory.subCategory,
      link: `/blog/post/${i + 1}`,
    };
  });
};

const combineURLs = (baseURL: string, relativeURL: string): string => {
  return `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`;
};

const BlogHeader: React.FC = () => {
  const [postCount, setPostCount] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 게시글 수 조회
  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error('API URL이 설정되지 않았습니다.');
        }

        const apiUrl = combineURLs(process.env.NEXT_PUBLIC_API_URL, 'tech-info/post/count');
        const response = await fetch(apiUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('게시글 수를 불러오는데 실패했습니다.');
        }

        const data = (await response.json()) as PostCountResponse;
        setPostCount(data.data);
      } catch (err) {
        console.error('Error fetching post count:', err);
        setError(err instanceof Error ? err.message : '게시글 수를 불러오는데 실패했습니다.');
      }
    };

    void fetchPostCount();
  }, []);

  // 캐러셀 아이템 생성
  useEffect(() => {
    setCarouselItems(generateRandomCarouselItems(7));
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-lg bg-red-50 p-4">
          <div className="text-red-800">{error}</div>
        </div>
      </div>
    );
  }

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
