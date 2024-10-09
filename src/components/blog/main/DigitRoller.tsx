import { useSpring, animated } from '@react-spring/web';
import React from 'react';

interface DigitRollerProps {
  digit: number;
}

const DigitRoller: React.FC<DigitRollerProps> = ({ digit }) => {
  const { transform } = useSpring({
    from: { transform: 'translateY(0%)' },
    to: { transform: `translateY(-${digit * 10}%)` },
    config: { mass: 1, tension: 180, friction: 12 },
  });

  return (
    <span className="inline-block h-[1em] w-[0.6em] overflow-hidden">
      <animated.span style={{ transform, display: 'inline-block' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span key={num} className="flex h-[1em] items-center justify-center">
            {num}
          </span>
        ))}
      </animated.span>
    </span>
  );
};

export default DigitRoller;
