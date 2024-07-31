import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white px-[24px] pt-[40px] pb-[50px] rounded-[32px] max-w-[496px] w-full max-h-[479px] h-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col  items-center">
          <h1 className="bg-gradient-to-r from-[#0500E8]  to-[#D366F9] inline-block text-transparent bg-clip-text font-[600] text-[24px]">
            {title}
          </h1>
          <h2 className="font-[400] text-[13px] mb-[40px]">ITZIP에 오신걸 환영합니다.</h2>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
