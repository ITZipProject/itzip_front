import { useAtom } from 'jotai';
import Image from 'next/image';
import React from 'react';

import { useUserAlgorithmStats } from '@/api/algorithm/fetchMyAlgorithmData';
import { accessTokenAtom } from '@/store/useTokenStore';
import { getTierName } from '@/utils/tierUtils';

const Loading = () => <p>Loading...</p>;
const NoData = () => <p>No data available</p>;

const MyData: React.FC = () => {
  const [accessToken] = useAtom(accessTokenAtom);

  const { data, isLoading } = useUserAlgorithmStats(accessToken);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <NoData />;
  }

  const { username, rating, rank, profileImageUrl, tier } = data;
  const tierName = getTierName(tier);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-3xl border border-zinc-600 bg-zinc-700 p-5">
      <div>
        <Image
          src={profileImageUrl || '/defaultProfileImage.jpg'}
          alt="프로필 이미지"
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <h1>{username}</h1>
      <div className="flex w-full flex-col items-start justify-center gap-4 px-5">
        <p>
          {tierName} {rating}
        </p>
        <p>Rank: {rank}</p>
      </div>
    </div>
  );
};

export default MyData;
