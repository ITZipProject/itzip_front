import { useFetchAlgorithmData } from '@/api/algorithm/fetchAlgorithm';
import React from 'react';

interface MainProps {
  tagId?: number;
  displayName?: string;
  resetTag: () => void;
}

const Main: React.FC<MainProps> = ({ tagId, displayName, resetTag }) => {
  const { data, isLoading, isError } = useFetchAlgorithmData(tagId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>문제 로딩중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>데이터를 가져오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  const handleClickProblem = (problemId: number) => {
    window.open(`https://www.acmicpc.net/problem/${problemId}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-3 h-full p-4 text-white bg-neutral-800 shadow-md">
      <div className="flex justify-between items-center gap-8 mb-4">
        <h3 className="text-2xl font-bold">{tagId ? displayName : '전체 문제'}</h3>
        <button className="bg-blue-900 text-white py-2 px-3 rounded" onClick={resetTag}>
          문제 추천
        </button>
      </div>
      <div className="w-full">
        <div className="flex justify-between p-5 border-b border-zinc-600 bg-gray-100">
          <h3 className="text-gray-400">문제 번호</h3>
          <h3 className="text-gray-400">제목</h3>
          <h3 className="text-gray-400">푼 사람 수</h3>
        </div>
        {data.length > 0 ? (
          data.map((problem) => (
            <div
              key={problem.problemId}
              className="flex justify-between p-5 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer rounded-md shadow-sm transform hover:scale-105 hover:shadow-lg"
              onClick={() => handleClickProblem(problem.problemId)}
            >
              <p className="text-gray-400">{problem.problemId}</p>
              <p className="text-gray-300">{problem.title}</p>
              <p className="text-gray-400">{problem.acceptedUserCount}</p>
            </div>
          ))
        ) : (
          <p>No problems found.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
