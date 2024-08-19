import React, { useState } from 'react';
import Image from 'next/image';
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
        className="flex items-center justify-center  bg-neutral-800  bg-gray-800 rounded-lg cursor-pointer w-[250px] h-[300px]"
      >
        <div className="flex flex-col gap-4 justify-center items-center">
          <Image
            src="/QuizAddImage.png"
            alt="카드이미지"
            width={48}
            height={48}
            className="rounded-full"
          />
          <h3 className="font-semibold text-xl text-slate-300">문제 만들기</h3>
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-semibold text-sm text-slate-400">나만의 문제를 만들어</h3>
            <h3 className="font-semibold text-sm text-slate-400">공유해보세요.</h3>
          </div>
        </div>
      </div>
      {isModalOpen && <MakeQuizModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default MakeQuizButton;
