import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import React from 'react';

import { useModal } from '@/lib/context/ModalContext';

const ModalBackButton = ({ title }: { title: string }) => {
  const { prevModals } = useModal();
  return (
    <div className="flex flex-row items-center">
      <button onClick={prevModals} className="-ml-4 size-1/6">
        <ChevronLeftIcon />
      </button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default ModalBackButton;
