import Image from 'next/image';
import React from 'react';

import { AuthorInfoProps } from '@/types/blog/common';

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, date }) => {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={`https://picsum.photos/seed/${author}/39/39`}
        alt={author}
        width={39}
        height={39}
        className="rounded-full"
      />
      <div className="flex gap-2 text-sm text-gray-400">
        <span>{author}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default AuthorInfo;
