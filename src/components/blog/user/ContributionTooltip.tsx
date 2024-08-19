import React from 'react';

interface ContributionTooltipProps {
  weekStart: string;
  count: number;
  position: { x: number; y: number };
}

const ContributionTooltip: React.FC<ContributionTooltipProps> = ({
  weekStart,
  count,
  position,
}) => {
  const date = new Date(weekStart);
  const currentYear = new Date().getFullYear();
  const weekNumber = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  let dateString;
  if (year === currentYear) {
    dateString = `${month}, ${weekNumber}주차`;
  } else {
    dateString = `${year}년 ${month}, ${weekNumber}주차`;
  }

  return (
    <div
      className="absolute z-10 whitespace-nowrap rounded-lg border border-gray-200 bg-white p-3 text-center text-sm shadow-lg before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white before:content-['']"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 15}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="relative">
        <div className="font-semibold text-gray-800">{dateString}</div>
        <div className="mt-1 text-blue-600">{`${count}개의 글 등록`}</div>
      </div>
    </div>
  );
};

export default ContributionTooltip;
