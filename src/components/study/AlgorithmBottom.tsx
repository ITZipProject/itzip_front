'use client';

import React from 'react';

interface RankingCardProps {
  rank: string;
  problemId: string;
  problemName: string;
  solvedBy: string;
}

const RankingCard: React.FC<RankingCardProps> = ({ rank, problemId, problemName, solvedBy }) => (
  <div className="flex justify-between items-center border-2 p-6 rounded-md shadow-md">
    <h3 className="text-xl font-semibold w-1/4 text-center">{rank}</h3>
    <h3 className="text-xl font-semibold w-1/4 text-center">{problemId}</h3>
    <h3 className="text-xl font-semibold w-1/4 text-center">{problemName}</h3>
    <h3 className="text-xl font-semibold w-1/4 text-center">{solvedBy}</h3>
  </div>
);

const AlgorithmBottom: React.FC = () => {
  const rankingData: RankingCardProps[] = [
    { rank: '01', problemId: '1918', problemName: '후위 표기식', solvedBy: '1,044명이 푼 문제' },
    { rank: '02', problemId: '1917', problemName: '다시 풀어보기', solvedBy: '987명이 푼 문제' },
    { rank: '03', problemId: '1916', problemName: '최적화 문제', solvedBy: '876명이 푼 문제' },
    { rank: '04', problemId: '1915', problemName: '미로 탐색', solvedBy: '823명이 푼 문제' },
    { rank: '05', problemId: '1914', problemName: '동적 계획법', solvedBy: '754명이 푼 문제' },
    { rank: '06', problemId: '1913', problemName: '그래프 이론', solvedBy: '692명이 푼 문제' },
    { rank: '07', problemId: '1912', problemName: '트리 순회', solvedBy: '644명이 푼 문제' },
    { rank: '08', problemId: '1911', problemName: '문자열 알고리즘', solvedBy: '598명이 푼 문제' },
    { rank: '09', problemId: '1910', problemName: '확률과 통계', solvedBy: '556명이 푼 문제' },
    { rank: '10', problemId: '1909', problemName: '수학 문제', solvedBy: '516명이 푼 문제' },
  ];

  return (
    <div className="flex w-full gap-8 px-10 py-6">
      <div className="w-1/3 flex flex-col gap-4 px-7 py-24">
        <h3 className="text-4xl font-bold">나의 순위를</h3>
        <h3 className="text-4xl font-bold">확인해보세요</h3>
      </div>
      <div className="w-2/3 flex flex-col gap-4">
        {rankingData.map((data, index) => (
          <RankingCard
            key={index}
            rank={data.rank}
            problemId={data.problemId}
            problemName={data.problemName}
            solvedBy={data.solvedBy}
          />
        ))}
      </div>
    </div>
  );
};

export default AlgorithmBottom;
