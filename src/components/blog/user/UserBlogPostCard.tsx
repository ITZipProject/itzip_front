import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface UserBlogPostCardProps {
  id: number;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  timeAgo: string;
  imageUrl: string;
}

const UserBlogPostCard: React.FC<UserBlogPostCardProps> = ({
  id,
  title,
  content,
  category,
  subCategory,
  timeAgo,
  imageUrl,
}) => {
  return (
    <div className="flex h-[500px] w-full max-w-[400px] flex-col overflow-hidden">
      <Link href={`/blog/post/${id}`} passHref className="relative h-[240px]">
        <Image src={imageUrl} className="rounded-xl" alt={title} layout="fill" objectFit="cover" />
      </Link>
      <div className="flex items-center gap-2 pb-3 pt-6">
        <span className="text-lg text-gray-600">{category}</span>
        <Image
          src="/icons/common/sub_icon/navigate_next_1.4px.svg"
          alt="Category Separator"
          width={16}
          height={16}
        />
        <span className="text-lg text-blue-600">{subCategory}</span>
      </div>
      <div className="grow">
        <Link href={`/blog/post/${id}`} passHref>
          <h3 className="mb-2 text-xl font-medium leading-8">{title}</h3>
        </Link>
        <Link href={`/blog/post/${id}`} passHref>
          <p className="line-clamp-3 text-lg leading-8 text-gray-600">{content}</p>
        </Link>
      </div>
      <div className="pb-6">
        <p className="text-sm text-gray-400">{timeAgo}</p>
      </div>
    </div>
  );
};

export default UserBlogPostCard;
