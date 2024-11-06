'use client';
import React, { useEffect, useState } from 'react';

import { CounterProps } from '@/types/blog/common';

import DigitRoller from './DigitRoller';

const RollingCounter: React.FC<CounterProps> = ({ endValue, duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(endValue);

  useEffect(() => {
    const startValue = Math.max(0, endValue - Math.floor(endValue * 0.1));
    let startTime: number;

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      const easeProgress = easeOutCubic(progress);

      const nextValue = Math.round(startValue + (endValue - startValue) * easeProgress);
      setCurrentValue(nextValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    // 약간의 지연 후 애니메이션 시작
    const timeoutId = setTimeout(() => requestAnimationFrame(animateCount), 100);

    return () => clearTimeout(timeoutId);
  }, [endValue, duration]);

  const formatNumber = (num: number): (string | number)[] => {
    const digits = num.toString().padStart(endValue.toString().length, '0').split('').map(Number);
    const result: (string | number)[] = [];
    digits.reverse().forEach((digit, index) => {
      if (index > 0 && index % 3 === 0) {
        result.unshift(',');
      }
      result.unshift(digit);
    });
    return result;
  };

  const formattedDigits = formatNumber(currentValue);

  return (
    <span className="inline-block font-mono font-bold text-blue-600">
      {formattedDigits.map((item, index) =>
        typeof item === 'number' ? (
          <DigitRoller key={index} digit={item} />
        ) : (
          <span key={index}>{item}</span>
        ),
      )}
    </span>
  );
};

export default RollingCounter;
