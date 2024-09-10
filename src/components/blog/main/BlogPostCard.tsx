import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BlogPostCardProps {
  id: number;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  likes: number;
  saves: number;
  author: string;
  timeAgo: string;
  imageUrl: string;
  profileImageUrl: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  title,
  content,
  category,
  subCategory,
  likes,
  saves,
  author,
  timeAgo,
  imageUrl,
  profileImageUrl,
}) => {
  return (
    <div className="flex h-[400px] w-full max-w-[300px] flex-col overflow-hidden">
      <Link href={`/blog/post/${id}`} passHref className="relative h-[180px]">
        <Image src={imageUrl} className="rounded-lg" alt={title} layout="fill" objectFit="cover" />
      </Link>
      <div className="flex items-center justify-between py-4 text-sm">
        <div className="flex items-center">
          <Link href={`/blog/category/${encodeURIComponent(category + subCategory)}`} passHref>
            <div className="flex items-center gap-2 pr-1">
              <span className="text-gray-600">{category}</span>
              <Image
                src="/icons/blog/whiteMode_DownArrow.png"
                alt="Category Separator"
                width={8}
                height={8}
                className="-rotate-90"
              />
              <span className="text-blue-600">{subCategory}</span>
            </div>
          </Link>
        </div>
        <span className="ml-auto pr-1 text-gray-600">
          좋아요 <span className="text-blue-400">{likes}</span>
        </span>
      </div>
      <div className="grow">
        <Link href={`/blog/post/${id}`} passHref>
          <h3 className="mb-2 cursor-pointer text-base font-medium">{title}</h3>
        </Link>
        <Link href={`/blog/post/${id}`} passHref>
          <p className="line-clamp-3 cursor-pointer text-sm text-gray-600">{content}</p>
        </Link>
      </div>
      <div className="flex items-center py-4">
        <Link href={`/blog/user/${encodeURIComponent(author)}`} passHref>
          <Image
            src={profileImageUrl}
            alt={author}
            width={32}
            height={32}
            className="cursor-pointer rounded-full"
          />
        </Link>
        <div className="ml-3">
          <Link href={`/blog/user/${encodeURIComponent(author)}`} passHref>
            <p className="cursor-pointer text-sm text-gray-600">{author}</p>
          </Link>
          <p className="text-xs text-gray-400">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
