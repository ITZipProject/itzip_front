import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface QuizValues {
  question: string;
  difficulty: string;
  answer: string;
  options: string[];
  category: number;
}

export const createQuiz = async ({
  values,
  accessToken,
}: {
  values: QuizValues;
  accessToken: string;
}) => {
  console.log(accessToken);
  await axios.post(
    `${apiUrl}cs-quiz/`,
    {
      questionText: values.question,
      difficulty: parseInt(values.difficulty.replace('Lv.', '')),
      answer: values.options.indexOf(values.answer) + 1,
      choices: values.options.map((option: string, index: number) => ({
        id: index + 1,
        choiceText: option,
      })),
      categoryId: values.category,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
