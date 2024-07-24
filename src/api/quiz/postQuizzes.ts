import axios from 'axios';
import { QuizData } from '../../types/quiz/quiz';

const apiUrl: string = process.env.NEXT_PUBLIC_API_URL || '';

export const postQuiz = async (quizData: QuizData) => {
  try {
    if (!apiUrl) {
      throw new Error('API URL이 정의되지 않았습니다');
    }

    const response = await axios.post(apiUrl, quizData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('문제 생성에 실패했습니다.');
    }

    return response.data;
  } catch (error) {
    console.error('문제 생성 에러:', error);
    throw new Error('문제 생성 중 오류가 발생했습니다.');
  }
};
