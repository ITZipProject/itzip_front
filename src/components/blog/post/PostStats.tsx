'use client';

import React, { useState, useEffect, useRef } from 'react';
import PostOptionsModal from './PostOptionsModal';

interface PostStatsProps {
  views: string;
}

const PostStats: React.FC<PostStatsProps> = ({ views }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    console.log('Edit post');
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log('Delete post');
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-3 text-sm text-gray-400">
      <span>조회수 {views}</span>
      <div className="relative" ref={modalRef}>
        <button
          className="flex size-6 flex-col items-center justify-center"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <div className="flex flex-col gap-1">
            <svg
              width="3"
              height="17"
              viewBox="0 0 3 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.48" cy="1.55" r="1.55" fill="#A3A3A3" />
              <circle cx="1.48" cy="8.5" r="1.55" fill="#A3A3A3" />
              <circle cx="1.48" cy="15.45" r="1.55" fill="#A3A3A3" />
            </svg>
          </div>
        </button>
        {isModalOpen && <PostOptionsModal onEdit={handleEdit} onDelete={handleDelete} />}
      </div>
    </div>
  );
};

export default PostStats;
