import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createQuiz = async ({ values, accessToken }: { values: any; accessToken: string }) => {
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
