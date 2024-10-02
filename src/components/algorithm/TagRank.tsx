import React from 'react';

interface Tag {
  bojTagId: number;
  displayName: string;
}

interface TagRankProps {
  onTagClick: (tagId: number, displayName: string) => void;
}

const TagRank: React.FC<TagRankProps> = ({ onTagClick }) => {
  const tags: Tag[] = [
    { bojTagId: 25, displayName: '다이나믹 프로그래밍' },
    { bojTagId: 175, displayName: '자료 구조' },
    { bojTagId: 33, displayName: '그리디 알고리즘' },
    { bojTagId: 11, displayName: '그래프 탐색' },
    { bojTagId: 97, displayName: '정렬' },
    { bojTagId: 120, displayName: '트리' },
    { bojTagId: 12, displayName: '이분 탐색' },
    { bojTagId: 141, displayName: '시뮬레이션' },
    { bojTagId: 126, displayName: '너비 우선 탐색' },
    { bojTagId: 127, displayName: '깊이 우선 탐색' },
    { bojTagId: 5, displayName: '백트래킹' },
    { bojTagId: 59, displayName: '우선순위 큐' },
    { bojTagId: 71, displayName: '스택' },
    { bojTagId: 72, displayName: '큐' },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 border border-zinc-600 rounded-xl h-full text-white bg-neutral-800">
      <h3 className="text-lg font-semibold mb-2">태그 추천 문제</h3>
      <div className="w-full gap-2 border-gray-300 rounded-md shadow-md flex flex-col justify-between items-start">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => onTagClick(tag.bojTagId, tag.displayName)}
            className="text-gray-300 text-sm"
          >
            {index + 1}. {tag.displayName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagRank;
