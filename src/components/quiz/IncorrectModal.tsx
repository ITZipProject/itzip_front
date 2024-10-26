import Image from 'next/image';
import React from 'react';

interface ModalProps {
  onClose: () => void;
}

const IncorrectModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="flex h-1/2 w-1/3 flex-col items-center justify-center gap-40 rounded-3xl bg-zinc-900 p-7 shadow-lg">
        <div className="flex flex-col items-center justify-center gap-10">
          <Image
            src="/inCorrectIcon.png"
            alt="오답 아이콘"
            width={128}
            height={32}
            className="rounded-full"
          />
          <div className="flex items-center justify-center gap-10">
            <h3 className="text-2xl">아쉽네요 ㅜㅜ 오답입니다</h3>
            <button onClick={onClose} className="rounded bg-blue-500 px-2 py-1 text-white">
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncorrectModal;
