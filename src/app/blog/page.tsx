import Link from 'next/link';
import React from 'react';

import BlogControls from '@/components/blog/main/BlogControls';
import BlogHeader from '@/components/blog/main/BlogHeader';
import BlogPostGrid from '@/components/blog/main/BlogPostGrid';

const BlogPage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <BlogHeader />
      <BlogControls />
      <BlogPostGrid />
      <div className="mx-auto max-w-7xl px-4 mt-8">
        <Link href={'/blog/userblog'} className="mr-4">
          개인 블로그 가기
        </Link>
        <Link href={'/blog/postwrite'}>블로그 작성하기</Link>
      </div>
    </div>
  );
};

export default BlogPage;
