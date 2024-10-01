import { useFetchAlgorithmData } from '@/api/algorithm/fetchAlgorithm';
import React from 'react';

const Main: React.FC = () => {
  const { data, isLoading, isError } = useFetchAlgorithmData();
  console.log('data:', data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error occurred while fetching data.</p>
      </div>
    );
  }

  const handleClick = (problemId: number) => {
    window.open(`https://www.acmicpc.net/problem/${problemId}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-3 h-full p-4 text-white bg-neutral-900 shadow-md overflow-auto">
      <div className="flex justify-end gap-8 mb-4">
        <button className="border border-gray-400 bg-blue-500 text-white py-2 px-3 rounded">
          문제 랜덤
        </button>
        <button className="border border-gray-400 bg-blue-500 text-white py-2 px-3 rounded">
          문제 추천
        </button>
      </div>
      <div className="w-full">
        <div className="flex justify-between p-5 border-b border-zinc-600 bg-gray-100 ">
          <h3>ID</h3>
          <h3>제목</h3>
          <h3>푼 사람 수</h3>
        </div>
        {data.length > 0 ? (
          data.map((problem) => (
            <div
              key={problem.problemId}
              className="flex justify-between p-5 border-b-2 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => handleClick(problem.problemId)}
            >
              <p>{problem.problemId}</p>
              <p>{problem.title}</p>
              <p>{problem.acceptedUserCount}</p>
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
