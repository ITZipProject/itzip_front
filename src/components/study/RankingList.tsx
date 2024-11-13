import { UserQuizPoint } from '@/types/study';

import RankingItem from './RankingItem';

interface RankingListProps {
  users: UserQuizPoint[];
}

const RankingList = ({ users }: RankingListProps) => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
      <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl">이달의 랭킹</h3>
      <div className="flex justify-between p-2 text-sm sm:text-base">
        <div className="flex gap-4 sm:gap-8">
          <p className="text-Grey-500">순위</p>
          <p className="text-Grey-500">닉네임</p>
        </div>
        <p className="text-Grey-500">점수</p>
      </div>
      <ul className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
        {users.map((user, index) => (
          <RankingItem key={index} user={user} rank={index + 1} />
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
