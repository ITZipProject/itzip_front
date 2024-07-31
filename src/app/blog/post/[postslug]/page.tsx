import React from 'react';

interface BlogPostPageProps {
  params: {
    postSlug: string;
  };
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ params }) => {
  return (
    <div>
      <h1>블로그 포스트: {params.postSlug}</h1>
      {/* 포스트 내용 */}
    </div>
  );
};

export default BlogPostPage;
