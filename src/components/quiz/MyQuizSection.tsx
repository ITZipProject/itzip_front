import { useAtom } from 'jotai';
import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { useMyQuizzes } from '@/api/quiz/fetchMyQuizzes';
import { accessTokenAtom } from '@/store/useTokenStore';
import { QuizData } from '@/types/quiz/quiz';

import MakeQuizButton from './MakeQuizButton';
import MyQuizCard from './MyQuizCard';
import QuizShowModal from './QuizShowModal';

const MyQuizSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);
  const [accessToken] = useAtom(accessTokenAtom);

  const { data: quizzes, isLoading, isError } = useMyQuizzes(accessToken);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 3,
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching quizzes</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold">내가 만든 문제</h3>
      <div className="flex items-center justify-between">
        <div className="w-1/5">
          <MakeQuizButton />
        </div>
        <div className="w-3/4 ">
          <Slider {...settings}>
            {quizzes &&
              quizzes.map((quiz: QuizData) => (
                <div key={quiz.id}>
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
