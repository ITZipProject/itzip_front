import React, { useState } from 'react';

import { QuizData } from '@/types/quiz/quiz';

import QuizCard from './QuizCard';
import QuizShowModal from '../../components/quiz/QuizShowModal';

type QuizCardSectionProps = {
  filteredAndSortedQuizzes: QuizData[];
};

const QuizCardSection: React.FC<QuizCardSectionProps> = ({ filteredAndSortedQuizzes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);

  const handleCardClick = (quiz: QuizData) => {
    if (quiz.userQuizStatus === 'CORRECT') {
      alert('이미 푼 문제입니다.');
      return;
    }
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {filteredAndSortedQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onClick={() => handleCardClick(quiz)} />
        ))}
      </div>
      {isModalOpen && selectedQuiz && (
        <QuizShowModal isOpen={isModalOpen} onClose={closeModal} {...selectedQuiz} />
      )}
    </div>
  );
};

export default QuizCardSection;
