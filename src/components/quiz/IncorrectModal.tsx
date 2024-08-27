import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
}

const IncorrectModal: React.FC<ModalProps> = ({ onClose }) => {
  const [selectedRate, setSelectedRate] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-3/4 h-3/4 bg-white p-7 rounded shadow-lg">
        <div className="flex items-center justify-between">
          <div></div>
          <h3 className="text-2xl">아쉽네요 ㅜㅜ 오답입니다</h3>
          <button onClick={onClose} className="px-2 py-1 bg-blue-500 text-white rounded">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncorrectModal;
