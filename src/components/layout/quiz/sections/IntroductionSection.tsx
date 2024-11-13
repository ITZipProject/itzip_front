import Image from 'next/image';

const IntroductionSection = () => {
  return (
    <section className="flex flex-col items-center justify-between gap-8 bg-Grey-800 p-4 sm:p-8 lg:flex-row lg:p-24">
      <div className="relative h-[300px] w-full rounded-2xl bg-Grey-700 sm:h-[361px] sm:w-[360px]">
        <div className="absolute bottom-10 left-10 h-spacing-19 w-[85px] rounded-lg bg-gradient-to-b from-gray-500 to-gray-700 sm:h-[250px] sm:w-[105px]"></div>
        <div className="absolute bottom-[145px] left-[145px] h-[85px] w-[63px] rounded-lg bg-purple-300 sm:h-[105px] sm:w-[83px]"></div>
        <div className="absolute bottom-[42px] right-[45px] h-[83px] w-[146px] rounded-lg bg-blue-500 sm:h-[103px] sm:w-[166px]"></div>
      </div>

      <div className="flex max-w-2xl flex-col gap-6">
        <h3 className="text-lg font-bold sm:text-xl lg:text-3xl">
          실전 같은 문제 풀이를 하나씩 쌓아가며,
        </h3>
        <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
          개발자로서의 실력과 자신감을 차곡차곡 쌓아 올리세요.
        </h3>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/polyline.png"
                alt="알고리즘 아이콘"
                width={24}
                height={24}
                className="rounded-full"
              />
              <h3 className="text-base sm:text-lg">알고리즘</h3>
            </div>
            <div className="text-sm sm:text-base">
              <p>알고리즘 문제를 통해 논리적 사고와 문제 해결 능력을</p>
              <p>향상시킬 수 있습니다. 다양한 난이도의 문제를 풀며</p>
              <p>실전 코딩 인터뷰에 대비하세요.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/quizImg.png"
                alt="퀴즈 아이콘"
                width={24}
                height={24}
                className="rounded-full"
              />
              <h3 className="text-base sm:text-lg">기술퀴즈</h3>
            </div>
            <div className="text-sm sm:text-base">
              <p>기술퀴즈는 개발자로서 필수적인 기술 지식을 테스트</p>
              <p>합니다. 프론트엔드, 백엔드, 데이터베이스 등 다양한</p>
              <p>분야의 퀴즈를 통해 실력을 점검하고 강화하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
