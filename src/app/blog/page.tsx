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
    </div>
  );
};

export default BlogPage;
