import Image from 'next/image';
import Link from 'next/link';

const LastSection = () => {
  return (
    <section className="flex flex-col gap-6 sm:gap-7">
      <h3 className="text-2xl font-bold sm:text-3xl lg:text-5xl">성장을 위한 첫 코드</h3>
      <div className="flex flex-col gap-1 text-sm sm:text-base">
        <p>
          기술퀴즈는 개발자로서 필수적인 기술 지식을 테스트합니다. 프론트엔드, 백엔드, 데이터베이스
          등
        </p>
        <p>다양한 분야의 퀴즈를 통해 실력을 점검하고 강화하세요.</p>
      </div>
      <div>
        <Link href="/study/quiz">
          <button className="hover:bg-gray-100 rounded-xl border-2 px-4 py-2 text-sm sm:px-5 sm:text-base">
            <span>문제 풀기</span>
          </button>
        </Link>
      </div>
      <div className="w-full">
        <Image
          src="/quizExample.png"
          alt="퀴즈 예시"
          width={1000}
          height={24}
          className="mx-auto w-full max-w-[1000px]"
        />
      </div>
    </section>
  );
};

export default LastSection;
