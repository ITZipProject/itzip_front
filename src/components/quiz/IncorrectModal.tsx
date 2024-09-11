import React from 'react';
import Image from 'next/image';

interface ModalProps {
  onClose: () => void;
}

const IncorrectModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-1/3 h-1/2 gap-40 bg-zinc-900 p-7 rounded-3xl shadow-lg">
        <div className="flex flex-col justify-center items-center gap-10">
          <Image
            src="/inCorrectIcon.png"
            alt="오답 아이콘"
            width={128}
            height={32}
            className="rounded-full"
          />
          <div className="flex justify-center items-center gap-10">
            <h3 className="text-2xl">아쉽네요 ㅜㅜ 오답입니다</h3>
            <button onClick={onClose} className="px-2 py-1 bg-blue-500 text-white rounded">
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncorrectModal;
