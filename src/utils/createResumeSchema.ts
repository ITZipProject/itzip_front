import { PHONE_REGEX, PHONE_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";

export const createResumeSchema = z.object({
  resume_title: z.string().max(50),
  phone: z.string().regex(PHONE_REGEX, PHONE_REGEX_ERROR),
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  introduction: z.string().max(5000),
});

export type createResumeSchemaType = z.infer<typeof createResumeSchema>;
