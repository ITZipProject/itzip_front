import React, { useState } from "react";
import QuizShowModal from "./QuizShowModal";
import { QuizData } from "../../types/quiz/quiz";

interface QuizCardProps extends Omit<QuizData, "answer"> {
  role: string;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  username,
  level,
  correctRate,
  category,
  options,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div
        className="w-full h-32 border-2 border-gray-300 rounded-md p-4 shadow-md flex flex-col justify-center items-center cursor-pointer"
        onClick={openModal}>
        <div>
          <h3 className="font-bold">{question}</h3>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex">
            <img
              src="/userImage.png"
              alt="유저이미지"
              className="w-4 h-4 mr-2"
            />
            <h3 className="mx-2">{username}</h3>
          </div>
          <div className="flex">
            <h3 className="mx-2">{level}</h3>
            <h3 className="mx-2">{`${correctRate}%`}</h3>
          </div>
        </div>
      </div>

      <QuizShowModal
        isOpen={isModalOpen}
        onClose={closeModal}
        question={question}
        category={category}
        options={options}
      />
    </div>
  );
};

export default QuizCard;
