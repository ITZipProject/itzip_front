'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-Grey-1000 bg-opacity-Grey-alpha-80"
      onClick={onClose}
    >
      <div
        className="shadow-Shadow-modal w-[435px] rounded-radius-06 bg-white px-spacing-11 py-[50px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
