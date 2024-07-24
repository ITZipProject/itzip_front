'use client';

import React from 'react';
import Quiz from '../../components/quiz/Quiz';
import Filter from '../../components/quiz/Filter';
import useQuizzes from '../../hooks/quiz/useQuizzes';

export default function Home() {
    const { quizzes, filteredQuizzes, setFilteredQuizzes, handleAddQuiz } = useQuizzes();

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
