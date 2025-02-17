import React from 'react';

import { useModal } from '@/lib/context/ModalContext';
import { ChevronLeftIcon } from 'lucide-react';

const ModalBackButton = ({ title }: { title: string }) => {
  const { prevModals } = useModal();
  return (
    <div className="flex flex-row items-center mb-4">
      <button onClick={prevModals} className="mr-2">
        <ChevronLeftIcon className="size-[32px]" />
      </button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default ModalBackButton;
