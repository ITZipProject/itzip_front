import { useAtom } from 'jotai';
import { quizzesAtom } from '@/lib/atoms/atoms';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizSchema } from '@/lib/quiz/QuizValidationSchema';
import { z } from 'zod';

type QuizFormValues = z.infer<typeof quizSchema>;

const useCreateQuiz = () => {
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);

  const methods = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
  });

  const handleCreateQuiz: SubmitHandler<QuizFormValues> = (values) => {
    const newQuiz = {
      _id: Math.random().toString(36).substr(2, 9),
      question_text: values.question,
      difficulty: parseInt(values.difficulty.replace('Lv.', '')),
      category: values.category,
      answer: values.options.indexOf(values.answer) + 1,
      create_date: new Date().toISOString(),
      modify_date: new Date().toISOString(),
      accepted_user_count: 0,
      tried_user_count: 0,
      points: 0,
      create_user_id: '1234567890123456789',
      choices: values.options.map((option, index) => ({
        id: index + 1,
        choice_text: option,
      })),
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  return {
    methods,
    handleCreateQuiz,
  };
};

export default useCreateQuiz;
