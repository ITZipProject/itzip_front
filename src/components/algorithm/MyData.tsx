import React from 'react';
import Image from 'next/image';
import { useFetchMyAlgorithmData } from '@/api/algorithm/fetchMyAlgorithmData';

const MyData: React.FC = () => {
  const { username, rating, rank, profileImageUrl } = useFetchMyAlgorithmData();

  return (
    <div className="w-full flex flex-col gap-8 justify-center items-center border border-zinc-600	 rounded-3xl bg-zinc-800 p-5">
      <div>
        <Image
          src={'/defaultProfileImage.jpg'}
          alt="프로필 이미지"
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <h1>{username}</h1>
      <div className="flex flex-col w-full justify-center items-start gap-4 px-5">
        <p>Rating: {rating}</p>
        <p>Rank: {rank}</p>
      </div>
    </div>
  );
};

export default MyData;
