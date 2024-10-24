import axios from 'axios';

export const submitPoint = async ({ quizId, point }: { quizId: string; point: number }) => {
  await axios.post(
    '/cs-quiz/point',
    {
      quizId: quizId,
      points: point,
    },
    { baseURL: process.env.NEXT_PUBLIC_API_URL },
  );
};
