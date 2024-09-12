export interface Job {
  title: string;
  industryName: string;
  locationName: string[];
  jobName: string[];
  expirationDate: string;
  experienceName: string;
  experienceMin: number;
  experienceMax: number;
}

export interface JobResponse {
  status: string;
  msg: string;
  data: {
    totalElements: number;
    totalPages: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    first: boolean;
    last: boolean;
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