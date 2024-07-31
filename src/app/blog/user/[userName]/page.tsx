import React from 'react';

import WeeklyContributionGraph from '@/components/blog/user/WeeklyContributionGraph';

interface UserBlogPageProps {
  params: {
    userName: string;
  };
}

const generateContributionData = () => {
  const data = [];
  const today = new Date();
  const currentWeekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  const oneYearAgo = new Date(currentWeekStart);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  for (let d = new Date(oneYearAgo); d <= currentWeekStart; d.setDate(d.getDate() + 7)) {
    const weekStart = d.toISOString().split('T')[0];
    const count = Math.floor(Math.random() * 10); // 0-9 사이의 랜덤한 포스트 수
    data.push({ weekStart, count });
  }
  return data;
};

const UserBlogPage: React.FC<UserBlogPageProps> = ({ params }) => {
  const { userName } = params;
  const contributionData = generateContributionData();

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Blog of {userName}</h1>
      <div className="mx-auto max-w-lg">
        <WeeklyContributionGraph data={contributionData} />
      </div>
      {/* 여기에 사용자의 블로그 포스트 목록이나 다른 정보를 추가할 수 있습니다 */}
    </div>
  );
};

export default UserBlogPage;
