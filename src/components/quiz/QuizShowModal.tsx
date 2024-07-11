import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  category: string;
  options: string[];
}

const QuizShowModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  question,
  category,
  options,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedOption(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg relative w-3/4 h-3/4 max-w-5xl max-h-screen overflow-auto flex flex-col items-center gap-10">
        <button className="absolute top-0 right-0 m-2" onClick={onClose}>
          X
        </button>
        <h3 className="text-center mt-8 text-xl">{category}</h3>
        <h3 className="text-center mt-4 text-2xl">{question}</h3>
        <div className="grid grid-cols-2 gap-4 w-2/3 mt-9">
          {options.map((option, index) => (
            <button
              key={index}
              className={`text-center text-xl ${
                selectedOption === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {index + 1}. {option}
            </button>
          ))}
        </div>
        <button className="flex justify-center items-center bg-gray-300 rounded-md px-24 py-5">
          <h3>제출하기</h3>
        </button>
      </div>
    </div>
  );
};

export default QuizShowModal;
