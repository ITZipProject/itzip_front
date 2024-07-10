"use client";

import React, { useState } from "react";
import QuizCard from "./QuizCard";
import QuizTopBar from "./QuizTopBar";
import MakeQuizModal from "./MakeQuizModal";
import { QuizData } from "../../types/quiz/quiz";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddQuiz = (quizData: QuizData) => {
    setQuizzes((prevQuizzes) => [...prevQuizzes, quizData]);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full px-6">
      <div className="flex justify-end w-full">
        <QuizTopBar onAddQuiz={() => setIsModalOpen(true)} />
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {quizzes.map((quiz, index) => (
          <QuizCard
            key={index}
            question={quiz.question}
            username={quiz.username}
            level={quiz.level}
            correctRate={quiz.correctRate}
            category={quiz.category}
            options={quiz.options}
          />
        ))}
      </div>
      {isModalOpen && (
        <MakeQuizModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddQuiz}
        />
      )}
    </div>
  );
};

export default Quiz;
