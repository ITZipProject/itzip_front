import React from 'react';

const TagRank = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-400 rounded-md shadow-md  h-full text-white bg-neutral-800 ">
      <div>
        <h3 className="text-lg font-semibold mb-2">태그 추천</h3>
        <div className="w-full h-72 gap-1 border-gray-300 rounded-md shadow-md flex flex-col justify-center items-center p-4 overflow-y-auto">
          {Array(8)
            .fill('다이나믹 프로그래밍')
            .map((tag, index) => (
              <h3 key={index} className="text-gray-300  text-sm">
                {index + 1}. {tag}
              </h3>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TagRank;
