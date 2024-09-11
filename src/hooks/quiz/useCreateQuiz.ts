import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizSchema } from '@/lib/quiz/QuizValidationSchema';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuiz } from '@/api/quiz/createQuiz';

type QuizFormValues = z.infer<typeof quizSchema>;

const useCreateQuiz = () => {
  const queryClient = useQueryClient();

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
    mutation.mutate(values);
  };

  return {
    methods,
    handleCreateQuiz,
  };
};

export default useCreateQuiz;
