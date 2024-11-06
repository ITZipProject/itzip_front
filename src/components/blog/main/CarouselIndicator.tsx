import Image from 'next/image';
import React from 'react';

import { CarouselIndicatorProps } from '@/types/blog/common';

const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({
  totalItems,
  currentIndex,
  onIndicatorClick,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="mb-2 mt-6 flex items-center justify-center gap-14">
      <button onClick={onPrevClick} className="rotate-180">
        <Image
          src="/icons/common/sub_icon/navigate_next_1.4px.svg"
          alt="Previous"
          width={16}
          height={16}
        />
      </button>
      <div className="flex gap-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => onIndicatorClick(index)}
            className={`size-2 rounded-full transition-colors duration-300 ${
              index === currentIndex - 1 ? 'bg-blue-600' : 'bg-gray'
            }`}
          />
        ))}
      </div>
      <button onClick={onNextClick}>
        <Image
          src="/icons/common/sub_icon/navigate_next_1.4px.svg"
          alt="Next"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};

export default CarouselIndicator;
