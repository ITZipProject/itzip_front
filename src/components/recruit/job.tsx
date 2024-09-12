// job.tsx

export interface Job {
  id: number;
  title: string;
  industryName: string;
  locationName: string[];
  jobName: string[];
  expirationDate: string;
  experienceName: string;
  experienceMin: number;
  experienceMax: number;
  scrapCount: number;
  companyName: string;
  url: string;
}

export interface JobResponse {
  status: string;
  msg: string;
  data: {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    size: number;
    content: Job[];
    number: number;
    numberOfElements: number;
    pageable: {
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      offset: number;
      paged: boolean;
      pageNumber: number;
      pageSize: number;
      unpaged: boolean;
    };
    empty: boolean;
  };
  code: string;
}