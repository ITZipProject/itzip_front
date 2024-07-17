"use client";

import React, { useState, useEffect } from "react";
import Quiz from "../../components/quiz/Quiz";
import Filter from "../../components/quiz/Filter";
import axios from "axios";
import { QuizData } from "../../types/quiz/quiz";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiUrl) {
          throw new Error("API URL is not defined");
        }
        const response = await axios.get(apiUrl);
        setQuizzes(response.data);
        setFilteredQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddQuiz = (quizData: QuizData) => {
    const updatedQuizzes = [...quizzes, quizData];
    setQuizzes(updatedQuizzes);
    setFilteredQuizzes(updatedQuizzes);
  };

  return (
    <div className="flex w-full h-screen overflow-y-auto">
      <div className="w-1/3 flex flex-col justify-center items-center sticky top-0">
        <Filter quizzes={quizzes} setFilteredQuizzes={setFilteredQuizzes} />
      </div>

      <div className="w-2/3 flex flex-col justify-start items-center">
        <Quiz quizzes={filteredQuizzes} onAddQuiz={handleAddQuiz} />
      </div>
    </div>
  );
}
