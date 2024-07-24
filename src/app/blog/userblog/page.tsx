import React from 'react';
import WeeklyContributionGraph from '@/components/blog/userblog/WeeklyContributionGraph';

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

const UserBlogPage = () => {
  const contributionData = generateContributionData();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Blog</h1>
      <div className="max-w-lg mx-auto">
        <WeeklyContributionGraph data={contributionData} />
      </div>
    </div>
  );
};

export default UserBlogPage;
