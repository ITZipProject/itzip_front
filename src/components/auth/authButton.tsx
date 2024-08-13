'use client';

import { useModal } from '@/lib/context/ModalContext';
import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text: string;
  modalId: string;
}

export default function Button({ text, modalId }: ButtonProps) {
  const { pending } = useFormStatus();
  const { closeModal } = useModal();

  useEffect(() => {
    // pending이 false로 변경될 때 모달을 닫습니다.
    if (!pending) {
      closeModal(modalId);
    }
  }, [pending, closeModal, modalId]);

  return (
    <button
      onClick={() => closeModal(modalId)}
      disabled={pending}
      className="primary-btn bg-[#F5F5F5] h-[48px] disabled:bg-[#F5F5F5]disabled:text-white disabled:cursor-not-allowed rounded-[12px] text-white font-[600] text-[14px]"
    >
      {pending ? '로딩 중...' : text}
    </button>
  );
}
