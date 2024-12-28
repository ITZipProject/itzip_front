import React, { ReactNode } from 'react';

interface ColumnItemProps {
  children: ReactNode;
}

const ColumnItem = ({ children }: ColumnItemProps) => {
  return (
    <div className="flex size-[100px] items-center justify-center gap-4 rounded-xl border-2 border-Blue-200 bg-white p-[10px]">
      {children}
    </div>
  );
};

export default ColumnItem;
