export interface Job {
  id: string;
  title: string;
  industry: {
    code: string;
    name: string;
  };
  location: {
    code: string;
    name: string;
  };
  jobType: {
    code: string;
    name: string;
  };
  jobMidCode: {
    code: string;
    name: string;
  };
  jobCode: {
    code: string;
    name: string;
  };
  experienceLevel: {
    code: number;
    min: number;
    max: number;
    name: string;
  };
  requiredEducationLevel: {
    code: string;
    name: string;
  };
  postedDate: string;
  recommendations: number;
  views: number;
  companyImage: string;
  url: string;
  company: string;
}