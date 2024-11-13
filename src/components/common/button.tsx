'use client';

import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

import { useModal } from '@/lib/context/ModalContext';

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  const { closeModal } = useModal();

  useEffect(() => {
    // pending이 false로 변경될 때 모달을 닫습니다.
    if (!pending) {
      closeModal();
    }
  }, [pending, closeModal]);

  return (
    <button
      onClick={() => closeModal()}
      disabled={pending}
      className="primary-btn h-spacing-12 rounded-radius-04 bg-[#D3D3D3] text-white disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
    >
      {pending ? '로딩 중...' : text}
    </button>
  );
}
