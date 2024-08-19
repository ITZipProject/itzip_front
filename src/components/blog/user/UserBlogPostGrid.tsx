import React from 'react';

import { blogCategories, getAllSubcategories } from '@/data/BlogCategories';

import UserBlogPostCard from './UserBlogPostCard';

const generateRandomPosts = (count: number) => {
  const subcategories = getAllSubcategories();
  const timeAgo = ['1시간 전', '3시간 전', '6시간 전', '12시간 전', '1일 전'];

  return Array.from({ length: count }, (_, i) => {
    const subCategory = subcategories[Math.floor(Math.random() * subcategories.length)];
    const category =
      Object.keys(blogCategories).find((key) => blogCategories[key].includes(subCategory)) ||
      '기타';

    return {
      id: i + 1,
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
  const posts = generateRandomPosts(6);
  return (
    <div className="w-full">
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        {posts.map((post) => (
          <UserBlogPostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default UserBlogPostGrid;
