import { useAtom } from 'jotai';
import React from 'react';

import { useFetchAlgorithmData } from '@/api/algorithm/fetchAlgorithm';
import { accessTokenAtom } from '@/store/useTokenStore';

interface MainProps {
  tagId?: number;
  displayName?: string;
  resetTag: () => void;
}

const Main: React.FC<MainProps> = ({ tagId, displayName, resetTag }) => {
  const [accessToken] = useAtom(accessTokenAtom);
  const { data, isLoading, isError } = useFetchAlgorithmData(accessToken ?? '', tagId);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>문제 로딩중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>데이터를 가져오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  const handleClickProblem = (problemId: number) => {
    window.open(`https://www.acmicpc.net/problem/${problemId}`, '_blank');
  };

  return (
    <div className="flex h-full flex-col gap-3 bg-neutral-800 p-4 text-white shadow-md">
      <div className="mb-4 flex items-center justify-between gap-8">
        <h3 className="text-2xl font-bold">{tagId ? `${displayName} 추천 문제` : '전체 문제'}</h3>
        <button
          className="rounded bg-blue-900 px-3 py-2 text-white hover:scale-105"
          onClick={resetTag}
        >
          문제 추천
        </button>
      </div>
      <div className="w-full">
        <div className="bg-gray-100 flex justify-between border-b border-zinc-600 p-5">
          <h3 className="text-gray-400">문제 번호</h3>
          <h3 className="text-gray-400">제목</h3>
          <h3 className="text-gray-400">푼 사람 수</h3>
        </div>
        {data && data.length > 0 ? (
          data.map((problem) => (
            <div
              key={problem.problemId}
              className="bg-gray-800 hover:bg-gray-700 flex cursor-pointer justify-between rounded-md p-5 shadow-sm transition-colors hover:scale-105 hover:shadow-lg"
              onClick={() => handleClickProblem(problem.problemId)}
            >
              <p className="text-gray-400">{problem.problemId}</p>
              <p className="text-gray-300">{problem.title}</p>
              <p className="text-gray-400">{problem.acceptedUserCount}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">문제를 찾을 수 없습니다.</p> // 메시지 변경
        )}
      </div>
    </div>
  );
};

export default Main;
