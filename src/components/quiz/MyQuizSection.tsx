import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { fetchMyQuizzes } from '@/api/quiz/fetchMyQuizzes';
import MakeQuizButton from './MakeQuizButton';
import { QuizData } from '@/types/quiz/quiz';
import QuizShowModal from './QuizShowModal';
import MyQuizCard from './MyQuizCard';

const MyQuizSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);

  const { data: quizzes } = fetchMyQuizzes();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold">내가 만든 문제</h3>
      <div className="flex justify-between items-center">
        <div className="w-1/5">
          <MakeQuizButton />
        </div>
        <div className="w-3/4 ">
          <Slider {...settings}>
            {quizzes &&
              quizzes.map((quiz: QuizData) => (
                <div key={quiz.id} className="px-2">
                  <MyQuizCard quiz={quiz} />
                </div>
              ))}
          </Slider>
        </div>
      </div>

      {isModalOpen && selectedQuiz && (
        <QuizShowModal isOpen={isModalOpen} onClose={closeModal} {...selectedQuiz} />
      )}
    </div>
  );
};

export default MyQuizSection;
