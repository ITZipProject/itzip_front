import Image from 'next/image';

import RankingList from '@/components/study/RankingList';

const USER_QUIZ_POINT_DATA = [
  { name: '김채민', point: 120 },
  { name: '한승균', point: 100 },
  { name: '박석원', point: 80 },
  { name: '김선구', point: 70 },
  { name: '박주철', point: 20 },
  { name: '신효승', point: 10 },
];

const StatisticsSection = () => {
  return (
    <section className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-12 sm:mt-12 sm:gap-16 lg:mt-20 lg:gap-24">
      <Image
        src="/studyFrame.png"
        alt="카드이미지"
        width={1500}
        height={64}
        className="w-full max-w-[800px] rounded-full"
        priority
      />

      <div className="relative w-full">
        <Image
          src="/studyMainPageImage2.svg"
          alt="Main Study Page Image"
          width={500}
          height={500}
          className="mx-auto h-auto w-full max-w-xl"
          priority
        />
        <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center space-y-2 p-4 text-white sm:space-y-4">
          <p className="text-lg font-semibold sm:text-2xl lg:text-4xl">2,500 문제</p>
          <p className="text-lg font-semibold sm:text-2xl lg:text-4xl">1~3 난이도</p>
          <p className="text-lg font-semibold sm:text-2xl lg:text-4xl">22개의 카테고리</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-8 sm:gap-12 lg:gap-16">
        <div className="flex flex-col gap-4 sm:gap-6">
          <h3 className="text-center text-xl font-bold sm:text-3xl lg:text-5xl">
            순위도 실력이다!
          </h3>
          <p className="text-center text-sm sm:text-base lg:text-lg">
            기술 퀴즈를 풀고 당신의 실력을 순위로 확인하세요!
          </p>
        </div>
        <RankingList users={USER_QUIZ_POINT_DATA} />
      </div>
    </section>
  );
};

export default StatisticsSection;
