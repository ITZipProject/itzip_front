import React from 'react';

interface PostStatsProps {
  views: string;
}

const PostStats: React.FC<PostStatsProps> = ({ views }) => {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-400">
      <span>조회수 {views}</span>
      <button className="hover:bg-gray-200 flex size-6 flex-col items-center justify-center rounded-full">
        <div className="flex flex-col gap-1">
          <span className="size-1 rounded-full bg-gray"></span>
          <span className="size-1 rounded-full bg-gray"></span>
          <span className="size-1 rounded-full bg-gray"></span>
        </div>
      </button>
    </div>
  );
};

export default PostStats;
