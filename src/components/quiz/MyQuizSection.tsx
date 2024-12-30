import { useAtom } from 'jotai';
import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { useMyQuizzes } from '@/api/quiz/fetchMyQuizzes';
import { setAccessTokenAtom } from '@/store/useTokenStore';
import { QuizData } from '@/types/quiz/quiz';

import MyQuizCard from './MyQuizCard';
import QuizShowModal from './QuizShowModal';

const MyQuizSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);
  const [accessToken] = useAtom(setAccessTokenAtom);

  const { data: quizzes, isLoading, isError } = useMyQuizzes(accessToken ?? '');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
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
    <div className="mx-auto flex max-w-[335px] flex-col gap-5 sm:max-w-2xl md:max-w-[704px] lg:max-w-6xl">
      <h3 className="text-2xl font-bold">내가 만든 문제</h3>
      <div className=" flex flex-col items-center justify-center md:flex md:flex-row">
        <div className="w-full max-w-full">
          <Slider {...settings}>
            {quizzes &&
              quizzes.map((quiz: QuizData) => (
                <div key={quiz.id} className="mx-8">
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
