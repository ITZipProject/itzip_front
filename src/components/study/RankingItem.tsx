interface RankingItemProps {
  user: {
    name: string;
    point: number;
  };
  rank: number;
}

const RankingItem = ({ user, rank }: RankingItemProps) => {
  return (
    <li className="flex justify-between border-b p-2">
      <div className="flex gap-4 sm:gap-8">
        <p className="rounded-full bg-color-button-primary px-2">{rank}</p>
        <p className="font-semibold">{user.name}</p>
      </div>
      <p className="text-Grey-500">{user.point}</p>
    </li>
  );
};

export default RankingItem;
