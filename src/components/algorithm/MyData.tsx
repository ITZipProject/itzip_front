import { useAtom } from 'jotai';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { useUserAlgorithmStats } from '@/api/algorithm/fetchMyAlgorithmData';
import { accessTokenAtom } from '@/store/useTokenStore';
import { getTierName } from '@/utils/tierUtils';

const Loading = () => (
  <div className="flex h-full items-center justify-center">
    <p>Loading...</p>
  </div>
);

const NoData = () => (
  <div className="flex h-full items-center justify-center">
    <p>데이터를 찾을 수 없습니다.</p>
  </div>
);

const MyData: React.FC = () => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading } = useUserAlgorithmStats(accessToken ?? '');

  if (!isClient) {
    return null; // 클라이언트 측에서만 렌더링하도록 함
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <NoData />;
  }

  const { username, rating, rank, profileImageUrl, tier } = data;
  const tierName = getTierName(tier);

  return (
    <div className="flex w-[335px] flex-col items-center justify-center gap-8 rounded-3xl border border-zinc-600 bg-Grey-800 p-5 sm:h-[300px] md:w-spacing-20 lg:h-[300px] lg:w-spacing-21">
      <div className="rounded-full bg-white p-4">
        <Image
          src={profileImageUrl || '/defaultProfileImage.jpg'}
          alt="프로필 이미지"
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <h1 className="text-xl font-bold">{username}</h1>
      <div className="flex w-full flex-col items-start justify-center gap-4 px-5">
        <div className="flex gap-2">
          <p className="text-color-text-tertiary">{tierName}</p>
          <p>{rating}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-color-text-tertiary">Rank</p>
          <p>{rank}</p>
        </div>
      </div>
    </div>
  );
};

export default MyData;
