import Link from 'next/link';
import React from 'react';

import BlogControls from '@/components/blog/main/BlogControls';
import BlogPostGrid from '@/components/blog/main/BlogPostGrid';

const BlogPage = () => {
  return (
    <div>
      <BlogControls />
      <BlogPostGrid />
      <Link href={'/blog/userblog'}>개인 블로그 가기</Link> <br />
      <Link href={'/blog/postwrite'}>블로그 작성하기</Link>
    </div>
  );
};

export default BlogPage;
