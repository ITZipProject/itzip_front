import { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizSchema } from '@/lib/quiz/QuizValidationSchema';
import { z } from 'zod';

type QuizFormValues = z.infer<typeof quizSchema>;

const useCreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const methods = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      category: '',
      difficulty: '',
      question: '',
      options: ['', ''],
      answer: '',
    },
  });

  const handleCreateQuiz: SubmitHandler<QuizFormValues> = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        '/cs-quiz/',
        {
          questionText: values.question,
          difficulty: parseInt(values.difficulty.replace('Lv.', '')),
          answer: values.options.indexOf(values.answer) + 1,
          userId: 10,
          choices: values.options.map((option, index) => ({
            id: index + 1,
            choiceText: option,
          })),
          categoryId: values.category,
        },
        {
          baseURL: apiUrl,
        },
      );

      console.log('문제 생성 완료');
    } catch (error) {
      console.error('Failed to create or fetch quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    methods,
    handleCreateQuiz,
    loading,
  };
};

export default useCreateQuiz;
