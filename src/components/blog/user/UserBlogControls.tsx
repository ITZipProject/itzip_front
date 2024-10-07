'use client';
import React, { useState } from 'react';

import BlogControlsDropdown from '../main/BlogControlsDropdown';

interface UserBlogControlsProps {
  postCount: number;
}

const UserBlogControls: React.FC<UserBlogControlsProps> = ({ postCount }) => {
  const [selectedSortOption, setSelectedSortOption] = useState<string>('최신순');
  const sortOptions = ['최신순', '과거순', '조회수순', '추천순'];

  const handleSortOptionSelect = (option: string) => {
    setSelectedSortOption(option);
    console.log(`Selected sort option: ${option}`);
    // 여기에 정렬 로직 추가
  };

  const formattedPostCount = postCount.toLocaleString('ko-KR');
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-1 pb-6">
      <div className="text-xl font-bold">전체 {formattedPostCount}개</div>
      <div className="flex items-center">
        <BlogControlsDropdown
          options={sortOptions}
          selectedOption={selectedSortOption}
          onSelect={handleSortOptionSelect}
          iconSrc="/icons/common/sub_icon/navigate_down_1.4px.svg"
          textSize="text-lg"
          textWeight="font-normal"
          iconSize={24}
        />
      </div>
    </div>
  );
};

export default UserBlogControls;
