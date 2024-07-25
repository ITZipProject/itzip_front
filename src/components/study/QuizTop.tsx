'use client';

import React from 'react';
import Link from 'next/link';

interface QuizData {
  title: string;
  options: string[];
  tags: string[];
}

interface QuizCardProps {
  title: string;
  options: string[];
  tags: string[];
}

export default function QuizTop() {
  const quizData: QuizData[] = [
    {
      title: '자바 sort 메소드에 사용되는 알고리즘은?',
      options: ['1 Callback', '2 Merge Sort', '3 Quick Sort', '4 Bubble Sort'],
      tags: ['javascript', '중급', '10+'],
    },
    {
      title: '자바 sort 메소드에 사용되는 알고리즘은?',
      options: ['1 Callback', '2 Merge Sort', '3 Quick Sort', '4 Bubble Sort'],
      tags: ['javascript', '중급', '10+'],
    },
    {
      title: '자바 sort 메소드에 사용되는 알고리즘은?',
      options: ['1 Callback', '2 Merge Sort', '3 Quick Sort', '4 Bubble Sort'],
      tags: ['javascript', '중급', '10+'],
    },
  ];

  return (
    <div className="flex flex-col w-full gap-8 bg-black px-10 py-6">
      <h3 className="text-sm text-amber-300">오늘의 추천 문제</h3>

      <div className="flex flex-col gap-4">
        <h3 className="text-4xl text-white font-bold">AI 추천 문제</h3>
        <div>
          <h3 className="text-xl font-light text-white">API 샘플코드로 개발을 시작해보세요.</h3>
          <h3 className="text-xl font-light text-white">
            API 샘플코드로 개발을 시작해보세요. API 샘플코드로 개발을 시작해보세요.
          </h3>
        </div>
      </div>

      <div>
        <Link href="/study/quiz">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            <h3 className="text-xl font-semibold">문제 풀기</h3>
          </button>
        </Link>
      </div>

      <div className="flex gap-6">
        {quizData.map((quiz, index) => (
          <QuizCard key={index} title={quiz.title} options={quiz.options} tags={quiz.tags} />
        ))}
      </div>
    </div>
  );
}

const QuizCard: React.FC<QuizCardProps> = ({ title, options, tags }) => {
  return (
    <div className="w-full bg-zinc-800 rounded-md shadow-md flex flex-col cursor-pointer transition transform hover:scale-105 hover:bg-zinc-700 hover:shadow-lg">
      <div className="p-4">
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="flex flex-col p-2 my-5">
        {options.map((option, index) => (
          <h3 key={index} className="mx-2 text-lime-500">
            {option}
          </h3>
        ))}
      </div>
      <div className="flex justify-between p-2 border-t-2">
        <div className="flex gap-4">
          {tags.map((tag, index) => (
            <h3
              key={index}
              className="border-2 p-1 rounded-md text-white text-xs flex items-center justify-center"
            >
              {tag}
            </h3>
          ))}
        </div>
        <div>
          <button className="bg-amber-200 p-2 rounded-xl">
            <h3 className="text-sm">정답보기</h3>
          </button>
        </div>
      </div>
    </div>
  );
};
