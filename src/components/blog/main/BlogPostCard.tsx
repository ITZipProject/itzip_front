import Image from 'next/image';
import React from 'react';

interface BlogPostCardProps {
  id: number;
  title: string;
  content: string;
  category: string;
  likes: number;
  saves: number;
  author: string;
  timeAgo: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  title,
  content,
  category,
  likes,
  saves,
  author,
  timeAgo,
}) => {
  const imageUrl = `https://picsum.photos/seed/${id}/600/400`;
  const profileImageUrl = `https://picsum.photos/seed/${id}-profile/40/40`;
  return (
    <div className="flex h-[400px] w-full max-w-[300px] flex-col overflow-hidden">
      <div className="relative h-[180px]">
        <Image src={imageUrl} className="rounded-xl" alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-wrap items-start gap-4 py-4 text-sm">
        <span className="text-blue-600">{category}</span>
        <span className="text-gray-600">
          좋아요 <span className="text-blue-400">{likes}</span>
        </span>
        <span className="text-gray-600">
          저장 <span className="text-blue-400">{saves}</span>
        </span>
      </div>
      <div className="grow">
        <h3 className="mb-2 text-base font-medium">{title}</h3>
        <p className="line-clamp-3 text-sm text-gray-600">{content}</p>
      </div>
      <div className="flex items-center py-4">
        <Image src={profileImageUrl} alt={author} width={32} height={32} className="rounded-full" />
        <div className="ml-3">
          <p className="text-sm text-gray-600">{author}</p>
          <p className="text-xs text-gray-400">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
