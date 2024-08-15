import React from 'react';

import UserBlogControls from '@/components/blog/user/UserBlogControls';
import UserBlogPostGrid from '@/components/blog/user/UserBlogPostGrid';
import UserInfoCard from '@/components/blog/user/UserInfoCard';
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
const generateRandomEmail = (username: string) => {
  const domains = ['gmail.com', 'naver.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  return `${username}@${domains[Math.floor(Math.random() * domains.length)]}`;
};

const generateRandomDescription = () => {
  const descriptions = [
    'AWS, Firebase, Spring, React, Next.js 주로 사용합니다. 소프트웨어 개발에 관심이 많습니다.',
    'Python과 데이터 사이언스를 공부하고 있습니다. 머신러닝에 관심이 많아요.',
    '프론트엔드 개발자입니다. UI/UX에 대한 열정이 있습니다.',
    '백엔드 개발을 주로 하고 있습니다. 시스템 아키텍처에 관심이 많아요.',
    '풀스택 개발자를 목표로 공부 중입니다. 새로운 기술을 배우는 것을 좋아해요.',
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const UserBlogPage: React.FC<UserBlogPageProps> = ({ params }) => {
  const decodedUserName = decodeURIComponent(params.userName);
  const contributionData = generateContributionData();
  const postCount = Math.floor(Math.random() * 1000000);
  const randomEmail = generateRandomEmail(decodedUserName);
  const randomDescription = generateRandomDescription();

  return (
    <div className="flex justify-center gap-10 p-10 pt-20">
      <div className="flex w-[376px] flex-col gap-7">
        <UserInfoCard
          username={decodedUserName}
          email={randomEmail}
          profileImage={`https://picsum.photos/seed/${decodedUserName}/130/130`}
          description={randomDescription}
        />
        {/*<div className="rounded-xl border border-gray-300 p-4">*/}
        <div className="rounded-xl p-4">
          <WeeklyContributionGraph data={contributionData} />
        </div>
      </div>
      <div className="max-w-3xl flex-1">
        <UserBlogControls postCount={postCount} />
        <UserBlogPostGrid />
      </div>
    </div>
  );
};

export default UserBlogPage;
