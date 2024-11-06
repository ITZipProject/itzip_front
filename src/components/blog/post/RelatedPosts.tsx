import Link from 'next/link';
import React from 'react';

import { RelatedPostsProps } from '@/types/blog/common';

const RelatedPosts: React.FC<RelatedPostsProps> = ({ userName, posts }) => {
  return (
    <div className="mt-10">
      <h3 className="mb-3 text-lg font-semibold text-gray-700">{userName}님의 다른 블로그 글</h3>
      <div className="border-t border-gray-300 pt-4">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between py-2">
            <Link href={`/blog/post/${post.id}`} className="text-gray-500 hover:text-gray-700">
              {post.title}
            </Link>
            <span className="text-sm text-gray-400">{post.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
