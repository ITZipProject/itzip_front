import axios from 'axios';
import { QuizData } from '../../types/quiz/quiz';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/quiz` : '';

export const fetchQuizzes = async (): Promise<QuizData[]> => {
    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw new Error('Failed to fetch quizzes');
    }
};
