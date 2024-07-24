// src/components/blog/userblog/WeeklyContributionGraph.tsx
'use client';

import React, { useState, useRef } from 'react';
import Tooltip from './Tooltip';

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
        if (count === 0) return 'bg-gray-100';
        if (count <= 2) return 'bg-green-100';
        if (count <= 4) return 'bg-green-200';
        if (count <= 6) return 'bg-green-300';
        return 'bg-green-400';
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
        <div className="mx-auto relative" ref={graphRef}>
            <div className="flex flex-wrap justify-start items-end">
                {weeks.map((week, index) => (
                    <div key={index} className="flex flex-col items-center mb-3">
                        {week.isMonthStart && (
                            <div className="text-xs text-gray-500 mb-1">{week.month}</div>
                        )}
                        <div
                            className={`w-5 h-5 m-0.5 ${getColor(week.count)}`}
                            onMouseEnter={(e) => handleMouseEnter(week, e)}
                            onMouseLeave={handleMouseLeave}
                        />
                    </div>
                ))}
            </div>
            {tooltipData && (
                <Tooltip
                    weekStart={tooltipData.weekStart}
                    count={tooltipData.count}
                    position={tooltipPosition}
                />
            )}
        </div>
    );
};

export default WeeklyContributionGraph;
