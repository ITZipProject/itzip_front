import Image from 'next/image';
import React from 'react';

import { CategoryTagProps } from '@/types/blog/common';

const CategoryTag: React.FC<CategoryTagProps> = ({ primary, secondary }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-600">{primary}</span>
      <Image
        src="/icons/blog/whiteMode_DownArrow.png"
        alt="arrow"
        width={7}
        height={7}
        className="-rotate-90"
      />
      <span className="text-blue-600">{secondary}</span>
    </div>
  );
};

export default CategoryTag;
