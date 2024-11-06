import { z } from 'zod';

import { PHONE_REGEX, PHONE_REGEX_ERROR } from '@/lib/constants';

export const createResumeSchema = z.object({
  resume_title: z.string().max(50),
  phone: z.string().regex(PHONE_REGEX, PHONE_REGEX_ERROR),
  email: z.string().max(12),
  introduction: z.string().max(5000),
});

export type createResumeSchemaType = z.infer<typeof createResumeSchema>;
