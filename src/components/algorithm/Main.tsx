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
    <div className="flex flex-col gap-3 h-full p-4 text-white bg-neutral-800 shadow-md overflow-auto scrollbar-hide">
      <div className="flex justify-end gap-8 mb-4">
        <button className="  bg-blue-900 text-white py-2 px-3 rounded">문제 추천</button>
      </div>
      <div className="w-full">
        <div className="flex justify-between p-5 border-b border-zinc-600 bg-gray-100 ">
          <h3>문제 번호</h3>
          <h3>제목</h3>
          <h3>푼 사람 수</h3>
        </div>
        {data.length > 0 ? (
          data.map((problem) => (
            <div
              key={problem.problemId}
              className="flex justify-between p-5 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => handleClick(problem.problemId)}
            >
              <p className="text-gray-300">{problem.problemId}</p>
              <p className="text-gray-300">{problem.title}</p>
              <p className="text-gray-300">{problem.acceptedUserCount}</p>
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
