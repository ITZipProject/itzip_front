import axios from 'axios';

export const submitPoint = async ({
  quizId,
  point,
  userId,
}: {
  quizId: string;
  point: number;
  userId: number;
}) => {
  await axios.post(
    '/cs-quiz/point',
    {
      userId: 7,
      quizId: quizId,
      points: point,
    },
    { baseURL: process.env.NEXT_PUBLIC_API_URL },
  );
};
