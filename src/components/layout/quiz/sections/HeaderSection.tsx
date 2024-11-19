import Link from 'next/link';

import SolvedacLinkBotton from '@/components/study/solvedacLinkButton';

const HeaderSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10">
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 lg:gap-5">
        <h3 className="text-center text-xl font-bold sm:text-2xl lg:text-5xl">
          우리는 개발자입니다.
        </h3>
        <div className="max-w-2xl">
          <p className="text-center text-xs text-slate-500 sm:text-sm lg:text-base">
            학습하기 홈은 주니어 개발자를 위한 문제 해결 중심의 학습 플랫폼입니다.
          </p>
          <p className="text-center text-xs text-slate-500 sm:text-sm lg:text-base">
            다양한 기술 퀴즈와 알고리즘 문제를 통해 실전에서 요구되는 문제 해결 능력을 키우세요!
          </p>
        </div>
      </div>
      <div className="flex gap-3 sm:gap-4 lg:gap-5">
        <Link href="/study/quiz">
          <button className="rounded-xl bg-white px-4 py-2 text-sm hover:bg-color-button-secondary-hover sm:px-5 sm:text-base">
            <span className="text-gray-800">문제 풀기</span>
          </button>
        </Link>
        <Link href="/study/algorithm">
          <button className="rounded-xl bg-color-button-primary px-4 py-2 text-sm hover:bg-color-button-primary-hover sm:px-5 sm:text-base">
            <span>알고리즘</span>
          </button>
        </Link>
      </div>
      <SolvedacLinkBotton />
    </section>
  );
};

export default HeaderSection;
