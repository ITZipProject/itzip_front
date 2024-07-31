import { atomWithReset } from 'jotai/utils';
import { IDefaultResume, IEducationResume, FormErrors, ICareerResume } from '@/types/resume';

export const defaultResumeAtom = atomWithReset<IDefaultResume>({
  resume_title: '',
  phone: '',
  email: '',
  introduction: '',
});

export const educationResumeAtom = atomWithReset<IEducationResume>({
  school_name: '',
  status: '',
  major: '',
  start_date: '',
  end_date: '',
});

export const careerResumeAtom = atomWithReset<ICareerResume[]>([
  {
    company_name: '',
    department: '',
    status: 'WORKING',
    start_date: '',
    end_date: '',
  },
]);

export const errorsAtom = atomWithReset<FormErrors>({
  defaultResume: {},
  educationResume: {},
  careerResume: {},
});

export const submittedAtom = atomWithReset<boolean>(false);
