import Image from 'next/image';
import React from 'react';

import logo from 'public/logo.png';

const loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start pt-40">
      <div className="flex flex-col items-center space-y-10">
        <Image src={logo} alt="logo" />
        <div className="flex animate-bounce flex-col items-center *:font-bold">
          <span className="">정보를 불러오는 중입니다.</span>
          <span>잠시만 기다려주세요!</span>
        </div>
      </div>
    </div>
  );
};

export default loading;
