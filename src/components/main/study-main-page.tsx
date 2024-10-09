import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function StudyMainPage() {
  return (
    <>
      <div className="flex bg-zinc-900 text-white">
        <section className="flex flex-col justify-start items-start w-1/2 gap-10 p-10">
          <div className="flex items-center gap-14 ">
            <h3 className=" text-2xl font-bold">기술 퀴즈</h3>
            <Link href="/study/quiz">
              <button className="bg-blue-900 p-2 rounded-lg text-lg font-bold hover:scale-105">
                기술퀴즈 풀러가기
              </button>
            </Link>
          </div>

          <div className="flex gap-10">
            <Image
              src="/quizImage1.png"
              alt="퀴즈이미지1"
              width={1500}
              height={64}
              className="rounded-md"
            />
            <Image
              src="/quizImage2.png"
              alt="퀴즈이미지2"
              width={1500}
              height={64}
              className="rounded-md"
            />
          </div>
        </section>
        <section className="flex flex-col justify-start items-end w-1/2 h-full gap-10 p-10">
          <div className="flex  items-center gap-14 ">
            <h3 className=" text-2xl font-bold">알고리즘</h3>
            <Link href="/study/algorithm">
              <button className="bg-blue-900 p-2 rounded-lg text-lg font-bold hover:scale-105">
                알고리즘 풀러가기
              </button>
            </Link>
          </div>
          <Image
            src="/algorithmImage.png"
            alt="알고리즘이미지"
            width={500}
            height={64}
            className="rounded-md"
          />
        </section>
      </div>
    </>
  );
}

export default StudyMainPage;
