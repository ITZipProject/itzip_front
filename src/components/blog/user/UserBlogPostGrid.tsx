'use client';
import React, { useState, useEffect } from 'react';

import { blogCategories, getAllSubcategories } from '@/data/BlogCategories';
import { UserBlogPost } from '@/types/blog/common';

import UserBlogPostCard from './UserBlogPostCard';
import BlogPagination from '../main/BlogPagination';

const POSTS_PER_PAGE = 6;

const generateRandomPosts = (count: number): UserBlogPost[] => {
  const subcategories = getAllSubcategories();
  const timeAgo = ['1시간 전', '3시간 전', '6시간 전', '12시간 전', '1일 전'];

  return Array.from({ length: count }, (_, i) => {
    const subCategory = subcategories[Math.floor(Math.random() * subcategories.length)];
    const category =
      Object.keys(blogCategories).find((key) => blogCategories[key].includes(subCategory)) ||
      '기타';

    return {
      id: `${i + 1}`,
      title: `블로그 포스트 제목 ${i + 1}`,
      content: `서류 합격률을 높인 단 한가지 비법 : 멘티 인터뷰 입니다. 서류 합격률을 높은 단 한가지 비법 : 멘티 인터뷰 입니다.`,
      category,
      subCategory,
      timeAgo: timeAgo[Math.floor(Math.random() * timeAgo.length)],
      imageUrl: `https://picsum.photos/seed/${i + 1}/800/480`,
    };
  });
};

const UserBlogPostGrid: React.FC = () => {
  const [posts, setPosts] = useState<UserBlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 비동기 작업 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 실제 API 호출로 대체해야 합니다.
        // const response = await fetch(`/api/user-posts?page=${currentPage}&limit=${POSTS_PER_PAGE}`);
        // const data = await response.json();
        // setPosts(data.posts);
        // setTotalPages(Math.ceil(data.totalPosts / POSTS_PER_PAGE));

        // 임시로 랜덤 포스트 생성
        const allPosts = generateRandomPosts(50);
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE;
        setPosts(allPosts.slice(start, end));
        setTotalPages(Math.ceil(allPosts.length / POSTS_PER_PAGE));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        // 에러 처리 로직 추가
      }
    };

    void fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full">
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        {posts.map((post) => (
          <UserBlogPostCard key={post.id} {...post} />
        ))}
      </div>
      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserBlogPostGrid;
