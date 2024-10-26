/* eslint-disable */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { createQuiz } from '@/api/quiz/createQuiz';
import { quizSchema } from '@/lib/quiz/QuizValidationSchema';
import { accessTokenAtom } from '@/store/useTokenStore';

type QuizFormValues = z.infer<typeof quizSchema>;

const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const [accessToken] = useAtom(accessTokenAtom);

  const methods = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      category: 0,
      difficulty: '',
      question: '',
      options: ['', ''],
      answer: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log('문제 생성 완료');
    },
    onError: (error) => {
      console.error('Failed to create or fetch quizzes:', error);
    },
  });

  const handleCreateQuiz: SubmitHandler<QuizFormValues> = (values) => {
    mutation.mutate({ values, accessToken });
  };

  return {
    methods,
    handleCreateQuiz,
  };
};

export default useCreateQuiz;
