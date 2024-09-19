import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0   flex justify-center bg-Grey-1000 bg-opacity-Grey-alpha-80 items-center "
      onClick={onClose}
    >
      <div
        className="bg-white w-[435px] rounded-[24px] py-[50px] px-[40px] shadow-Shadow-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
