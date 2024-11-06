import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { UserInfo } from '@/types/blog/common';

const UserInfoCard: React.FC<UserInfo> = ({ username, email, profileImage, description }) => {
  return (
    <div className="flex w-full max-w-[376px] flex-col items-center rounded-xl border border-gray-300 p-8">
      <Image
        src={profileImage}
        alt={username}
        width={130}
        height={130}
        className="mb-6 rounded-full"
      />
      <h2 className="mb-1 text-center text-2xl font-bold">{username}</h2>
      <p className="mb-6 text-sm text-gray-500">{email}</p>
      <Link href="/blog/editor" className="w-full">
        <button className="mb-6 w-full rounded-xl border border-gray-300 py-2 font-bold">
          작성하기
        </button>
      </Link>
      <p className="text-center text-sm text-gray-700">{description}</p>
    </div>
  );
};

export default UserInfoCard;
