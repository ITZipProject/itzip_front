import React from 'react';

interface AlgorithmData {
  id: number;
  title: string;
  solvedCount: number;
}

interface MainProps {
  algorithmData: AlgorithmData[];
}

const Main: React.FC<MainProps> = ({ algorithmData }) => {
  return (
    <div className="flex flex-col gap-3 h-full p-4 text-white bg-neutral-900 border-2 rounded-md shadow-md overflow-auto">
      <div className="flex justify-end gap-8 mb-4">
        <button className="border border-gray-400 bg-blue-500 text-white py-2 px-3 rounded">
          문제 랜덤
        </button>
        <button className="border border-gray-400 bg-blue-500 text-white py-2 px-3 rounded">
          문제 추천
        </button>
      </div>
      <div className="w-full border-2 rounded-md">
        <div className="flex justify-between p-5 border-b-2 bg-gray-100">
          <h3>ID</h3>
          <h3>제목</h3>
          <h3>푼 사람 수</h3>
        </div>
        {algorithmData &&
          algorithmData.map((data) => (
            <div key={data.id} className="flex justify-between p-5 border-b-2">
              <p>{data.id}</p>
              <p>{data.title}</p>
              <p>{data.solvedCount}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Main;
