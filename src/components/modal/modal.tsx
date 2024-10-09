import React from 'react';
import { createPortal } from 'react-dom';
import { usePortal } from '@/hooks/usePortal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  id: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, id }) => {
  const portal = usePortal(`modal-${id}`);

  if (!isOpen || !portal) return null;

  return createPortal(
    <div
      // onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>,
    portal,
  );
};
