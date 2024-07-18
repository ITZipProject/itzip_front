'use client';

import React, { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import QuizTopBar from './QuizTopBar';
import MakeQuizModal from './MakeQuizModal';
import { QuizData } from '../../types/quiz/quiz';

interface QuizProps {
    quizzes: QuizData[];
    onAddQuiz: (quizData: QuizData) => void;
}

const Quiz: React.FC<QuizProps> = ({ quizzes, onAddQuiz }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortedQuizzes, setSortedQuizzes] = useState<QuizData[]>([]);
    const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | 'recommended'>('latest');

    useEffect(() => {
        setSortedQuizzes(sortQuizzes(quizzes, sortOrder));
    }, [quizzes, sortOrder]);

    const handleAddQuiz = (quizData: QuizData) => {
        onAddQuiz(quizData);
        setSortedQuizzes(sortQuizzes([...sortedQuizzes, quizData], sortOrder));
    };

    const sortQuizzes = (
        quizzes: QuizData[],
        order: 'latest' | 'oldest' | 'recommended',
    ): QuizData[] => {
        return quizzes.slice().sort((a, b) => {
            if (order === 'recommended') {
                return b.likes - a.likes;
            }
            const dateA = new Date(a.timestamp).getTime();
            const dateB = new Date(b.timestamp).getTime();
            return order === 'oldest' ? dateA - dateB : dateB - dateA;
        });
    };

    return (
        <div className="flex flex-col gap-4 w-full h-full px-6">
            <div className="flex justify-end w-full">
                <QuizTopBar onAddQuiz={() => setIsModalOpen(true)} setSortOrder={setSortOrder} />
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
                {sortedQuizzes.map((quiz, index) => (
                    <QuizCard
                        key={index}
                        question={quiz.question}
                        username={quiz.username}
                        level={quiz.level}
                        correctRate={quiz.correctRate}
                        category={quiz.category}
                        options={quiz.options}
                        answer={quiz.answer}
                        timestamp={quiz.timestamp}
                        likes={quiz.likes}
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
