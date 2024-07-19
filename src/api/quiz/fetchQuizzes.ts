import axios from 'axios';
import { QuizData } from '../../types/quiz/quiz';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchQuizzes = async (): Promise<QuizData[]> => {
    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }
    const response = await axios.get(apiUrl);
    return response.data;
};
