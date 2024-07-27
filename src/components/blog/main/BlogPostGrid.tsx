import React from 'react';

import BlogPostCard from './BlogPostCard';

// 임시 데이터 생성 함수
const generateRandomPosts = (count: number) => {
  const categories = ['개발', '데브옵스', 'AI', '디자인', '마케팅'];
  const authors = ['짱구는멋쟁이', '철수는못말려', '유리는예쁘다', '맹구는똑똑해', '훈이는멋져'];
  const timeAgo = ['1시간 전', '3시간 전', '6시간 전', '12시간 전', '1일 전'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `블로그 포스트 제목 ${i + 1}`,
    content: `서류 합격률을 높인 단 한가지 비법 : 멘티 인터뷰 입니다. 서류 합격률을 높은 단 한가지 비법 : 멘티 인터뷰 입니다.`,
    category: categories[Math.floor(Math.random() * categories.length)],
    likes: Math.floor(Math.random() * 100),
    saves: Math.floor(Math.random() * 50),
    author: authors[Math.floor(Math.random() * authors.length)],
    timeAgo: timeAgo[Math.floor(Math.random() * timeAgo.length)],
  }));
};

const BlogPostGrid: React.FC = () => {
  const posts = generateRandomPosts(20);
  return (
    <div className="mx-auto max-w-7xl">
      <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="flex justify-center">
            <BlogPostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostGrid;
