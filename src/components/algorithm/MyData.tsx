import React from 'react';
import Image from 'next/image';

interface UserDataProps {
  userData: {
    username: string;
    rating: number;
    solvedCount: number;
    solvedCountRank: number;
  };
  profileImage: string;
}

const MyData: React.FC<UserDataProps> = ({ userData, profileImage }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center border rounded-3xl">
      <div>
        <Image
          src={profileImage}
          alt="프로필 이미지"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
      <h1>{userData.username}</h1>
      <p>Rating: {userData.rating}</p>
      <p>Solved Count: {userData.solvedCount}</p>
      <p>Solved Count Rank: {userData.solvedCountRank}</p>
    </div>
  );
};

export default MyData;
