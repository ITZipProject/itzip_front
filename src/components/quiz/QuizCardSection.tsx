import React, { useState } from 'react';
import QuizCard from './QuizCard';
import { QuizData } from '@/types/quiz/quiz';
import QuizShowModal from '../../components/quiz/QuizShowModal';
import MakeQuizButton from '../../components/quiz/MakeQuizButton';

type QuizCardSectionProps = {
  filteredAndSortedQuizzes: QuizData[];
};

const QuizCardSection: React.FC<QuizCardSectionProps> = ({ filteredAndSortedQuizzes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);

  const handleCardClick = (quiz: QuizData) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-28">
        {filteredAndSortedQuizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} onClick={() => handleCardClick(quiz)} />
        ))}
      </div>
      {isModalOpen && selectedQuiz && (
        <QuizShowModal isOpen={isModalOpen} onClose={closeModal} {...selectedQuiz} />
      )}
    </div>
  );
};

export default QuizCardSection;
