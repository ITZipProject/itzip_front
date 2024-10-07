import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface UserInfoProps {
  name: string;
  description: string;
  email: string;
  profileImage: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, description, email, profileImage }) => {
  return (
    <div className="mt-10 flex items-center space-x-6 rounded-xl bg-[#FAFAFA] p-6">
      <div className="shrink-0">
        <Image
          src={profileImage}
          alt={`${name}'s profile`}
          width={116}
          height={116}
          className="rounded-full"
        />
      </div>
      <div>
        <Link href={`/blog/user/${encodeURIComponent(name)}`} className="group">
          <button className="flex items-center text-xl font-medium transition-colors duration-200 group-hover:text-blue-600">
            {name}
            <Image
              src="/icons/blog/whiteMode_DownArrow.png"
              alt="Arrow"
              width={12}
              height={12}
              className="ml-2 -rotate-90 transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </Link>
        <p className="mt-2 line-clamp-2 font-light text-gray-500">{description}</p>
        <p className="mt-2 text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
