import Image from 'next/image';
import React, { useState } from 'react';

import MakeQuizModal from './MakeQuizModal';

const MakeQuizButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddQuiz = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleAddQuiz}
        className="flex h-[70px] w-[250px] cursor-pointer items-center justify-center  rounded-lg bg-neutral-700 py-12"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/QuizAddImage.png"
            alt="카드이미지"
            width={24}
            height={24}
            className="rounded-full"
          />
          <h3 className="text-xl font-semibold text-slate-300">문제 만들기</h3>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold text-slate-400">나만의 문제를 만들어</h3>
            <h3 className="text-sm font-semibold text-slate-400">공유해보세요.</h3>
          </div>
        </div>
      </div>
      {isModalOpen && <MakeQuizModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default MakeQuizButton;
