'use client';

import { useEffect } from 'react';

import Portal from './portal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleBodyScroll = () => {
      const modalElements = document.querySelectorAll('[data-modal]');
      if (modalElements.length > 0) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    if (isOpen) {
      handleBodyScroll();
    }

    return () => {
      // setTimeout을 사용하여 DOM 업데이트 후 스크롤 상태 확인
      setTimeout(() => {
        handleBodyScroll();
      }, 0);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal containerId="modal-root">
      <div className="fixed inset-0 z-50 overflow-y-auto" data-modal>
        <div
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
