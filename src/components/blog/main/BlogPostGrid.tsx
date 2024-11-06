'use client';
import React, { useState, useEffect } from 'react';

import { blogCategories, getAllSubcategories } from '@/data/BlogCategories';
import { BlogPost } from '@/types/blog/common';

import BlogPagination from './BlogPagination';
import BlogPostCard from './BlogPostCard';

// Post 인터페이스 제거
const POSTS_PER_PAGE = 12;

const generateRandomPosts = (count: number): BlogPost[] => {
  const subcategories = getAllSubcategories();
  const authors = ['짱구는멋쟁이', '철수는못말려', '유리는예쁘다', '맹구는똑똑해', '훈이는멋져'];
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
      likes: Math.floor(Math.random() * 100),
      saves: Math.floor(Math.random() * 50),
      author: authors[Math.floor(Math.random() * authors.length)],
      timeAgo: timeAgo[Math.floor(Math.random() * timeAgo.length)],
      imageUrl: `https://picsum.photos/seed/${i + 1}/600/400`,
      profileImageUrl: `https://picsum.photos/seed/${i + 1}-profile/40/40`,
    };
  });
};

const BlogPostGrid: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 비동기 작업 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 실제 API 호출로 대체해야 함
        // const response = await fetch(`/api/posts?page=${currentPage}&limit=${POSTS_PER_PAGE}`);
        // const data = await response.json();
        // setPosts(data.posts);
        // setTotalPages(Math.ceil(data.totalPosts / POSTS_PER_PAGE));

        // 임시로 랜덤 포스트 생성
        const allPosts = generateRandomPosts(127);
        setTotalPosts(allPosts.length);
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
    // 페이지 변경 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  };

  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden px-4">
      <div className="grid justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <BlogPostCard key={post.id} {...post} />
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

export default BlogPostGrid;
