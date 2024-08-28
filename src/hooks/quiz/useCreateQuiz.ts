// import axios from 'axios';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { quizSchema } from '@/lib/quiz/QuizValidationSchema';
// import { z } from 'zod';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// type QuizFormValues = z.infer<typeof quizSchema>;

// const useCreateQuiz = () => {
//   const queryClient = useQueryClient();
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   const methods = useForm<QuizFormValues>({
//     resolver: zodResolver(quizSchema),
//     defaultValues: {
//       category: '',
//       difficulty: '',
//       question: '',
//       options: ['', ''],
//       answer: '',
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: async (values: QuizFormValues) => {
//       await axios.post(
//         '/cs-quiz/',
//         {
//           questionText: values.question,
//           difficulty: parseInt(values.difficulty.replace('Lv.', '')),
//           answer: values.options.indexOf(values.answer) + 1,
//           userId: 10,
//           choices: values.options.map((option, index) => ({
//             id: index + 1,
//             choiceText: option,
//           })),
//           categoryId: values.category,
//         },
//         {
//           baseURL: apiUrl,
//         },
//       );
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries();
//       console.log('문제 생성 완료');
//     },
//     onError: (error) => {
//       console.error('Failed to create or fetch quizzes:', error);
//     },
//   });

//   const handleCreateQuiz: SubmitHandler<QuizFormValues> = (values) => {
//     mutation.mutate(values);
//   };

//   return {
//     methods,
//     handleCreateQuiz,
//   };
// };

// export default useCreateQuiz;

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
