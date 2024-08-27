'use client';

import Image from 'next/image';
import React from 'react';

interface BlogPostActionsProps {
  likes: number;
}

const BlogPostActions: React.FC<BlogPostActionsProps> = ({ likes }) => {
  const handleLike = () => {
    // 좋아요 처리 로직
    console.log('Liked');
  };

  const handleBookmark = () => {
    // 북마크 처리 로직
    console.log('Bookmarked');
  };

  const handleShare = () => {
    // 공유 처리 로직
    console.log('Shared');
  };

  return (
    <div className="inline-flex items-center space-x-4 rounded-xl border border-gray-300 p-2">
      <button onClick={handleLike} className="flex items-center space-x-2">
        <Image src="/icons/common/main_icon/like_2px.svg" alt="Like" width={20} height={20} />
        <span>{likes}</span>
      </button>
      <button onClick={handleBookmark}>
        <Image
          src="/icons/common/main_icon/bookmark_2px.svg"
          alt="Bookmark"
          width={16}
          height={20}
        />
      </button>
      <button onClick={handleShare}>
        <Image src="/icons/common/main_icon/share_2px.svg" alt="Share" width={20} height={20} />
      </button>
    </div>
  );
};

export default BlogPostActions;
