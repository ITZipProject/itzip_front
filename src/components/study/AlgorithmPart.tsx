'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AlgorithmPart() {
  return (
    <div className="flex flex-col  gap-20">
      <div className="flex">
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-4xl font-bold">ITZIP만의 추천 시스템을 통해</h3>
            <h3 className="text-4xl font-bold">실력에 맞는 문제들을</h3>
            <h3 className="text-4xl font-bold">풀어보세요</h3>
          </div>
          <div>
            <h3>API 샘플코드로 개발을 시작해보세요</h3>
          </div>
          <div>
            <Link href="/study/algorithm">
              <button className="border-2 rounded-xl px-5 py-2">
                <h3>알고리즘</h3>
              </button>
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/CardImage.png"
            alt="카드이미지"
            width={512}
            height={64}
            className="rounded-full"
          />
        </div>
      </div>

      <div>
        <h3 className="text-4xl font-bold">카테고리별 원하는 </h3>
        <h3 className="text-4xl font-bold"> 문제들을 풀어보세요</h3>
      </div>

      <div>
        <h3 className="text-4xl font-bold">ITZIP의 새로운 랭킹 </h3>
        <h3 className="text-4xl font-bold"> 시스템을 통해</h3>
        <h3 className="text-4xl font-bold">랭킹 추천 문제를 받아보세요</h3>
      </div>
    </div>
  );
}
