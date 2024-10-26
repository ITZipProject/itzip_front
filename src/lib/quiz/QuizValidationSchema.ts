import { z } from 'zod';

const hasUniqueValues = (arr: string[]) => new Set(arr).size === arr.length;

export const quizSchema = z.object({
  category: z.number().int().min(1, { message: '카테고리를 선택해 주세요.' }),
  difficulty: z.string().min(1, { message: '난이도를 선택해 주세요.' }),
  question: z.string().min(1, { message: '문제를 입력해 주세요!' }),
  options: z
    .array(z.string().min(1, { message: '선택지를 입력해 주세요!' }))
    .min(2, { message: '최소 두 개의 선택지가 필요합니다.' })
    .refine(hasUniqueValues, { message: '선택지에 중복된 값이 있습니다.' }),
  answer: z.string().min(1, { message: '정답을 선택해 주세요.' }),
});
