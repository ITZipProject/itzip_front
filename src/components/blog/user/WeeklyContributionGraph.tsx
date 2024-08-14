'use client';
import React, { useState, useRef } from 'react';

import ContributionTooltip from './ContributionTooltip';

interface ContributionData {
  weekStart: string;
  count: number;
}

interface WeeklyContributionGraphProps {
  data: ContributionData[];
}

const WeeklyContributionGraph: React.FC<WeeklyContributionGraphProps> = ({ data }) => {
  const [tooltipData, setTooltipData] = useState<ContributionData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const graphRef = useRef<HTMLDivElement>(null);

  const getColor = (count: number): string => {
    if (count === 0) return 'bg-blue-50';
    if (count <= 1) return 'bg-blue-100';
    if (count <= 2) return 'bg-blue-200';
    if (count <= 3) return 'bg-blue-300';
    if (count <= 4) return 'bg-blue-400';
    if (count <= 5) return 'bg-blue-500';
    if (count <= 6) return 'bg-blue-600';
    if (count <= 7) return 'bg-blue-700';
    if (count <= 8) return 'bg-blue-800';
    if (count <= 9) return 'bg-blue-900';
    return 'bg-blue-950';
  };

  const generateWeeks = () => {
    const today = new Date();
    const currentWeekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const oneYearAgo = new Date(currentWeekStart);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const weeks = [];
    for (let d = new Date(oneYearAgo); d <= currentWeekStart; d.setDate(d.getDate() + 7)) {
      const weekStart = new Date(d);
      const weekStartString = weekStart.toISOString().split('T')[0];
      const contributionData = data.find((item) => item.weekStart === weekStartString);
      weeks.push({
        weekStart: weekStartString,
        count: contributionData ? contributionData.count : 0,
        isMonthStart: weekStart.getDate() <= 7,
        month: weekStart.toLocaleString('default', { month: 'short' }),
      });
    }
    return weeks;
  };

  const weeks = generateWeeks();

  const handleMouseEnter = (week: ContributionData, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const graphRect = graphRef.current?.getBoundingClientRect();
    if (graphRect) {
      setTooltipData(week);
      setTooltipPosition({
        x: rect.left - graphRect.left + rect.width / 2,
        y: rect.top - graphRect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <div className="relative mx-auto w-full" ref={graphRef}>
      <div className="flex flex-wrap items-end justify-start">
        {weeks.map((week, index) => (
          <div key={index} className="mb-3 flex flex-col items-center">
            {week.isMonthStart && (
              <div className="mb-1 text-xs font-semibold text-gray-500">{week.month}</div>
            )}
            <div
              className={`m-px size-4 ${getColor(week.count)}`}
              onMouseEnter={(e) => handleMouseEnter(week, e)}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        ))}
      </div>
      {tooltipData && (
        <ContributionTooltip
          weekStart={tooltipData.weekStart}
          count={tooltipData.count}
          position={tooltipPosition}
        />
      )}
    </div>
  );
};

export default WeeklyContributionGraph;
