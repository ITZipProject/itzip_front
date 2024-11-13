import Image from 'next/image';
import Link from 'next/link';

import SolvedacLinkBotton from '@/components/study/solvedacLinkButton';

const StudyPageLayout = () => {
  return (
    <div className="flex w-full flex-col gap-20 ">
      <section className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-5">
          <h3 className="text-5xl font-bold">우리는 개발자입니다.</h3>
          <div>
            <p className="text-center text-slate-500">
              학습하기 홈은 주니어 개발자를 위한 문제 해결 중심의 학습 플랫폼입니다.
            </p>
            <p className="text-center text-slate-500">
              다양한 기술 퀴즈와 알고리즘 문제를 통해 실전에서 요구되는 문제 해결 능력을 키우세요!
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <Link href="/study/quiz">
              <button className="rounded-xl border-2 px-5 py-2">
                <h3>문제 풀기</h3>
              </button>
            </Link>
          </div>
          <div>
            <Link href="/study/algorithm">
              <button className="rounded-xl border-2 px-5 py-2">
                <h3>알고리즘</h3>
              </button>
            </Link>
          </div>
        </div>
        <SolvedacLinkBotton />
      </section>
      <section className="mt-20">
        <Image
          src="/studyFrame.png"
          alt="카드이미지"
          width={1500}
          height={64}
          className="rounded-full"
        />
      </section>

      <section className="flex flex-col items-center justify-center gap-8">
        <h3 className="text-3xl font-bold">실전 같은 문제 풀이를 하나씩 쌓아가며,</h3>
        <h3 className="text-3xl font-semibold">
          개발자로서의 실력과 자신감을 차곡차곡 쌓아 올리세요.
        </h3>
        <div className="flex gap-10">
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
