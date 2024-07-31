import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { filteredQuizzesAtom } from '../../lib/atoms/atoms';
import QuizCard from './QuizCard';
import QuizTopBar from './QuizTopBar';
import MakeQuizModal from './MakeQuizModal';
import QuizShowModal from './QuizShowModal';
import { QuizData } from '../../types/quiz/quiz';

const Quiz: React.FC = () => {
  const [filteredQuizzes] = useAtom(filteredQuizzesAtom);
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | 'recommended'>('latest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);
  const [sortedQuizzes, setSortedQuizzes] = useState<QuizData[]>([]);

  useEffect(() => {
    const sorted = filteredQuizzes.slice().sort((a, b) => {
      if (sortOrder === 'recommended') {
        return b.accepted_user_count - a.accepted_user_count;
      }
      const dateA = new Date(a.create_date).getTime();
      const dateB = new Date(b.create_date).getTime();
      return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA;
    });
    setSortedQuizzes(sorted);
  }, [filteredQuizzes, sortOrder]);

  const handleAddQuiz = () => {
    setIsModalOpen(true);
  };

  const handleCardClick = (quiz: QuizData) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full px-6">
      <div className="flex justify-end w-full">
        <QuizTopBar onAddQuiz={handleAddQuiz} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {sortedQuizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} onClick={() => handleCardClick(quiz)} />
        ))}
      </div>
      {isModalOpen && selectedQuiz && (
        <QuizShowModal isOpen={isModalOpen} onClose={closeModal} {...selectedQuiz} />
      )}
      {isModalOpen && !selectedQuiz && <MakeQuizModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default Quiz;
