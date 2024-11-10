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
    if (isOpen) {
      const currentOverflow = document.body.style.overflow;
      if (currentOverflow !== 'hidden') {
        document.body.style.overflow = 'hidden';
      }
    }
    return () => {
      const modalCount = document.querySelectorAll('[data-modal]').length;
      if (modalCount === 1) {
        document.body.style.overflow = 'unset';
      }
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
