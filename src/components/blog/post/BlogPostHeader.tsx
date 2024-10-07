import React from 'react';

import AuthorInfo from './AuthorInfo';
import CategoryTag from './CategoryTag';
import PostStats from './PostStats';

interface PostData {
  category: {
    primary: string;
    secondary: string;
  };
  title: string;
  author: string;
  date: string;
  views: string;
}

interface BlogPostHeaderProps {
  postData: PostData;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ postData }) => {
  return (
    <div className="flex flex-col items-start border-b border-blue-600 pb-10">
      <CategoryTag primary={postData.category.primary} secondary={postData.category.secondary} />
      <h1 className="mb-4 mt-2 text-2xl font-normal">{postData.title}</h1>
      <div className="flex w-full items-center justify-between">
        <AuthorInfo author={postData.author} date={postData.date} />
        <PostStats views={postData.views} />
      </div>
    </div>
  );
};

export default BlogPostHeader;
