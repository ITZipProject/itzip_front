import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const submitPoint = async ({
  quizId,
  point,
  accessToken,
}: {
  quizId: string;
  point: number;
  accessToken: string;
}) => {
  await axios.post(
    `${apiUrl}cs-quiz/point`,
    {
      quizId: quizId,
      points: point,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
