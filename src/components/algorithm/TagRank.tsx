import React from 'react';

interface Tag {
  id: number;
  name: string;
}

interface TagRankProps {
  onTagClick: (tag: number) => void;
}

const TagRank: React.FC<TagRankProps> = ({ onTagClick }) => {
  const tags: Tag[] = [
    { id: 1, name: '다이나믹 프로그래밍' },
    { id: 2, name: '그래프' },
    { id: 3, name: '그리디' },
    { id: 4, name: '정렬' },
    { id: 5, name: '트리' },
    { id: 6, name: '비트마스크' },
    { id: 7, name: '수학' },
    { id: 8, name: '기타' },
    { id: 9, name: '수학' },
    { id: 10, name: '기타' },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 border border-zinc-600 rounded-xl h-full text-white bg-neutral-800 ">
      <h3 className="text-lg font-semibold mb-2">태그 추천</h3>
      <div className="w-full h-72 gap-2 border-gray-300 rounded-md shadow-md flex flex-col justify-between items-start ">
        {tags.map((tag, index) => (
          <h3 key={index} onClick={() => onTagClick(tag.id)} className="text-gray-300  text-sm">
            {tag.id}. {tag.name}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default TagRank;
