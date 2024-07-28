/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface RollingCounterProps {
  endValue: number;
  duration?: number;
}

const RollingCounter: React.FC<RollingCounterProps> = ({ endValue, duration = 2000 }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, []);

  const { number } = useSpring({
    reset: true,
    from: { number: 0 },
    number: endValue,
    delay: 5,
    config: { mass: 1, tension: 20, friction: 10, duration: duration },
    key: key,
  });

  return (
    <animated.span className="inline-block font-mono font-bold text-blue-600">
      {number.to((n: number) => Math.floor(n).toLocaleString('en-US'))}
    </animated.span>
  );
};

export default RollingCounter;
