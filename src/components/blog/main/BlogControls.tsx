import Image from 'next/image';
import React from 'react';

const BlogControls: React.FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between py-4">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-medium">전체</span>
        <Image
          src="/icons/blog/whiteMode_DownArrow.png"
          alt="Down Arrow"
          width={20}
          height={20}
          className="rotate-90"
        />
      </div>

      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-1">
          <span className="text-lg">최신순</span>
          <Image
            src="/icons/blog/whiteMode_DownArrow.png"
            alt="Down Arrow"
            width={15}
            height={15}
            className="rotate-90"
          />
        </div>

        <button className="rounded-full border border-gray-300 p-2">
          <Image src="/icons/blog/whiteMode_WritePen.png" alt="Write Post" width={24} height={24} />
        </button>

        <button className="rounded-full bg-blue-600 px-4 py-2 text-lg font-medium text-white">
          내블로그
        </button>
      </div>
    </div>
  );
};

export default BlogControls;
