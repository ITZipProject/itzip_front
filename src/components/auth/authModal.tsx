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
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-[435px] rounded-[24px] py-[50px] px-[40px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="">
          <h2 className="text-[#6C6C6C] font-[500] text-[16px]">
            ITZIP을 다채롭게 즐기기 위해서는
          </h2>
          <h2 className="text-[#171717] font-[700] text-[24px]">{title}</h2>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
