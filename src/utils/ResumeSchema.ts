import { PHONE_REGEX, PHONE_REGEX_ERROR } from '@/lib/constants';
import { z } from 'zod';
import { IDefaultResume, IEducationResume, FormErrors, ICareerResume } from '@/types/resume';

export const defaultResumeSchema = z.object({
  resume_title: z.string().min(1, '제목을 채워주세요').max(50, '제목이 너무 깁니다'),
  phone: z.string().regex(PHONE_REGEX, PHONE_REGEX_ERROR),
  email: z.string().min(1, '이메일을 입력해주세요').max(12),
  introduction: z.string().min(1, '소개글을 입력해주세요').max(5000, '소개글이 너무 깁니다'),
});

export const educationResumeSchema = z.object({
  school_name: z.string().min(1, '학교이름을 알려주세요'),
  status: z.string().min(1, '상태를 알려주세요'),
  major: z.string().min(1, '학과를 알려주세요'),
  start_date: z.string().min(1, '입학일을 알려주세요'),
  end_date: z.string().min(1, '졸업일을 알려주세요'),
});

export const careerResumeSchema = z.object({
  company_name: z.string().min(1, '회사이름을 알려주세요ㄴ'),
  department: z.string().min(1, '부서를 입력해주세요'),
  status: z.string().min(1, '상태를 알려주세요'),
  start_date: z.string().min(1, '입사일을 압력해주세요'),
  end_date: z.string().min(1, '퇴사일을 입력해주세요'),
});

export const validateDefaultData = (data: IDefaultResume) => {
  const validation = defaultResumeSchema.safeParse(data);
  if (!validation.success) {
    const newErrors: Partial<IDefaultResume> = {};
    validation.error.errors.forEach((error) => {
      newErrors[error.path[0] as keyof IDefaultResume] = error.message;
    });
    return newErrors;
  }
  return {};
};

export const validateEducationData = (data: IEducationResume) => {
  const validation = educationResumeSchema.safeParse(data);

  if (!validation.success) {
    const newErrors: Partial<IEducationResume> = {};
    validation.error.errors.forEach((error) => {
      newErrors[error.path[0] as keyof IEducationResume] = error.message;
    });
    return newErrors;
  }
  return {};
};
export const validateCareerData = (
  careerData: ICareerResume[],
): { [index: number]: Partial<ICareerResume> } => {
  const errors: { [index: number]: Partial<ICareerResume> } = {};
  careerData.forEach((item, index) => {
    const itemErrors: Partial<ICareerResume> = {};
    if (!item.company_name) itemErrors.company_name = 'Company name is required';
    if (!item.department) itemErrors.department = 'Department is required';
    if (!item.start_date) itemErrors.start_date = 'Start date is required';
    if (!item.end_date) itemErrors.end_date = 'End date is required';
    if (Object.keys(itemErrors).length > 0) errors[index] = itemErrors;
  });
  return errors;
};
