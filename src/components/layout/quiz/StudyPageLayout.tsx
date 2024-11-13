import Image from 'next/image';
import Link from 'next/link';

import SolvedacLinkBotton from '@/components/study/solvedacLinkButton';

const USER_QUIZ_POINT_DATA = [
  { name: '김채민', point: 120 },
  { name: '한승균', point: 100 },
  { name: '박석원', point: 80 },
  { name: '김선구', point: 70 },
  { name: '박주철', point: 20 },
  { name: '신효승', point: 10 },
];

const StudyPageLayout = () => {
  return (
    <div className="flex w-full flex-col gap-20 ">
      <section className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-5">
          <h3 className="text-2xl font-bold md:text-3xl lg:text-5xl">우리는 개발자입니다.</h3>
          <div>
            <p className="text-center text-xs text-slate-500 md:text-sm lg:text-base">
              학습하기 홈은 주니어 개발자를 위한 문제 해결 중심의 학습 플랫폼입니다.
            </p>
            <p className="text-center text-xs text-slate-500 md:text-sm lg:text-base">
              다양한 기술 퀴즈와 알고리즘 문제를 통해 실전에서 요구되는 문제 해결 능력을 키우세요!
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <Link href="/study/quiz">
              <button className="rounded-xl bg-white px-5 py-2 hover:bg-color-button-secondary-hover">
                <h3 className="text-gray-800">문제 풀기</h3>
              </button>
            </Link>
          </div>
          <div>
            <Link href="/study/algorithm">
              <button className="rounded-xl bg-color-button-primary px-5 py-2 hover:bg-color-button-primary-hover">
                <h3>알고리즘</h3>
              </button>
            </Link>
          </div>
        </div>
        <SolvedacLinkBotton />
      </section>
      <section className="mx-auto mt-20 flex max-w-3xl flex-col items-center gap-24">
        <Image
          src="/studyFrame.png"
          alt="카드이미지"
          width={1500}
          height={64}
          className="rounded-full"
        />

        <div className="relative">
          <Image
            src="/studyMainPageImage2.svg"
            alt="Main Study Page Image"
            width={500}
            height={500}
            className="mx-auto h-auto w-full max-w-xl"
          />
          <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center space-y-2 p-4 text-white">
            <p className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">2,500 문제</p>
            <p className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">1~3 난이도</p>
            <p className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
              22개의 카테고리
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-16">
          <div className="flex flex-col gap-8">
            <h3 className="text-center text-2xl font-bold  md:text-3xl lg:text-5xl">
              순위도 실력이다!
            </h3>
            <p className="text-center">기술 퀴즈를 풀고 당신의 실력을 순위로 확인하세요!</p>
          </div>

          <div className="flex flex-col gap-12">
            <h3 className="text-3xl font-semibold">이달의 랭킹</h3>
            <div className="flex justify-between p-2">
              <div className="flex gap-8">
                <p className="text-Grey-500">순위</p>
                <p className="text-Grey-500">닉네임</p>
              </div>
              <p className="text-Grey-500">점수</p>
            </div>
            <ul className="flex flex-col gap-8">
              {USER_QUIZ_POINT_DATA.map((user, index) => (
                <li className="flex justify-between border-b p-2" key={index}>
                  <div className="flex gap-8">
                    <p className="rounded-full bg-color-button-primary  px-2">{index + 1}</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <p className="text-Grey-500">{user.point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-between gap-8  bg-Grey-800 px-2 py-24 sm:flex sm:flex-row sm:px-4 lg:px-6">
        <div className="relative h-[361px] w-[360px] rounded-2xl bg-Grey-700">
          <div className="absolute bottom-10 left-10  h-[250px]  w-[105px] rounded-lg bg-gradient-to-b from-gray-500 to-gray-700"></div>

          <div className="absolute bottom-[145px] left-[145px] h-[105px] w-[83px] rounded-lg bg-purple-300"></div>

          <div className="absolute bottom-[42px]  right-[45px] h-[103px] w-[166px] rounded-lg bg-blue-500"></div>
        </div>

        <div>
          <h3 className="text-xl font-bold sm:text-2xl lg:text-3xl">
            실전 같은 문제 풀이를 하나씩 쌓아가며,
          </h3>
          <h3 className="text-3xl font-semibold">
            개발자로서의 실력과 자신감을 차곡차곡 쌓아 올리세요.
          </h3>
          <div className="flex flex-col gap-10 lg:flex  lg:flex-row">
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <div>
                  <Image
                    src="/polyline.png"
                    alt="카드이미지"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
                <h3>알고리즘</h3>
              </div>
              <div>
                <h3>알고리즘 문제를 통해 논리적 사고와 문제 해결 능력을</h3>
                <h3>향상시킬 수 있습니다. 다양한 난이도의 문제를 풀며</h3>
                <h3>실전 코딩 인터뷰에 대비하세요.</h3>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <div>
                  <Image
                    src="/quizImg.png"
                    alt="카드이미지"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
                <h3>기술퀴즈</h3>
              </div>
              <div>
                <h3>기술퀴즈는 개발자로서 필수적인 기술 지식을 테스트</h3>
                <h3>합니다. 프론트엔드, 백엔드, 데이터베이스 등 다양한</h3>
                <h3>분야의 퀴즈를 통해 실력을 점검하고 강화하세요.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-7">
        <h3 className="text-5xl font-bold">성장을 위한 첫 코드</h3>
        <div className="flex flex-col gap-1">
          <h3>
            기술퀴즈는 개발자로서 필수적인 기술 지식을 테스트합니다. 프론트엔드, 백엔드,
            데이터베이스 등
          </h3>
          <h3>다양한 분야의 퀴즈를 통해 실력을 점검하고 강화하세요.</h3>
        </div>
        <div>
          <Link href="/study/quiz">
            <button className="rounded-xl border-2 px-5 py-2">
              <h3>문제 풀기</h3>
            </button>
          </Link>
        </div>
        <div>
          <Image src="/quizExample.png" alt="카드이미지" width={1000} height={24} />
        </div>
      </section>
    </div>
  );
};
export default StudyPageLayout;
