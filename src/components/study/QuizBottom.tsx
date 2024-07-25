'use client';

import React from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { difficultyAtom } from '../../lib/atoms/atoms';

export default function QuizBottom() {
  return (
    <div className="flex flex-col w-full gap-8 px-10 py-6">
      <div>
        <h3 className="text-3xl font-bold">실력에 맞는 문제들을 풀어보세요!</h3>
      </div>
      <div className="flex gap-10">
        <QuizCard level="Lv.1" />
        <QuizCard level="Lv.2" />
        <QuizCard level="Lv.3" />
      </div>
    </div>
  );
}

interface QuizCardProps {
  level: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ level }) => {
  const [, setDifficulty] = useAtom(difficultyAtom);

  const handleClick = () => {
    setDifficulty(level);
  };

  return (
    <Link href={'/study/quiz'} passHref>
      <div
        className="w-full h-full border-2 rounded-md shadow-md flex flex-col cursor-pointer"
        onClick={handleClick}
      >
        <h3 className="p-4 text-center text-lg font-semibold">{level}</h3>
        <div className="flex-grow flex items-center justify-center">
          <button className="py-2 px-4 rounded-md">
            <h3>바로가기</h3>
          </button>
        </div>
      </div>
    </Link>
  );
};
