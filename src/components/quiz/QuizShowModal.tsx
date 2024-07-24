import React, { useState } from 'react';
import { QuizData } from '../../types/quiz/quiz';
import CorrectModal from '../quiz/CorrectModal';
import IncorrectModal from '../quiz/IncorrectModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizShowModal: React.FC<ModalProps & QuizData> = ({
  isOpen,
  onClose,
  question,
  category,
  options,
  answer,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrectModalOpen, setIsCorrectModalOpen] = useState(false);
  const [isIncorrectModalOpen, setIsIncorrectModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      if (selectedOption + 1 === answer) {
        setIsCorrectModalOpen(true);
      } else {
        setIsIncorrectModalOpen(true);
      }
      setSelectedOption(null);
    }
  };

  const closeCorrectModal = () => {
    setIsCorrectModalOpen(false);
    onClose();
  };

  const closeIncorrectModal = () => {
    setIsIncorrectModalOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg relative w-3/4 h-3/4 max-w-5xl max-h-screen overflow-auto flex flex-col items-center gap-10">
        <button className="absolute top-0 right-0 m-2" onClick={onClose}>
          X
        </button>
        <h3 className="text-center mt-8 text-xl">{category}</h3>
        <h3 className="text-center mt-4 text-2xl">{question}</h3>
        <div className="grid grid-cols-2 gap-4 w-full mt-9 justify-items-center">
          {options.map((option, index) => (
            <button
              key={index}
              className={`flex justify-center items-center w-2/3 text-center text-xl py-2 ${
                selectedOption === index ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {index + 1}. {option}
            </button>
          ))}
        </div>
        <button
          className="flex justify-center items-center bg-gray-300 rounded-md px-24 py-5"
          onClick={handleSubmit}
        >
          <h3>제출하기</h3>
        </button>
      </div>

      {isCorrectModalOpen && <CorrectModal onClose={closeCorrectModal} />}
      {isIncorrectModalOpen && <IncorrectModal onClose={closeIncorrectModal} answer={answer} />}
    </div>
  );
};

export default QuizShowModal;
