/* eslint-disable */

export interface IDefaultResume {
  resume_title: string;
  phone: string;
  email: string;
  introduction: string;
}

export interface IEducationResume {
  school_name: string;
  status: string;
  major: string;
  start_date: string;
  end_date: string;
}

export interface ICareerResume {
  company_name: string;
  department: string;
  status: 'WORKING' | 'LEAVE' | undefined | string;
  start_date: string;
  end_date: string;
}

export interface FormErrors {
  defaultResume: {
    resume_title?: string;
    phone?: string;
    email?: string;
    introduction?: string;
  };
  educationResume: {
    school_name?: string;
    status?: string;
    major?: string;
    start_date?: string;
    end_date?: string;
  };
  careerResume: {
    [index: number]: {
      company_name?: string;
      department?: string;
      status?: string;
      start_date?: string;
      end_date?: string;
    };
  };
}
