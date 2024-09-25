import axios from 'axios';
import { Job } from '@/components/recruit/job';

const baseUrl = 'http://3.39.78.0:8080/api';

interface FetchJobsParams {
  page: number;
  size: number;
  sort: string;
  techName?: string;
  locationName?: string[];
  experienceMin?: number;
  experienceMax?: number;
  search?: string;
}

interface JobResponse {
  status: string;
  msg: string;
  data: {
    totalElements: number;
    totalPages: number;
    content: Job[];
  };
  code: string;
}

export async function fetchJobs(params: FetchJobsParams): Promise<{ jobs: Job[]; totalPages: number }> {
  try {
    console.log('Fetching jobs with params:', params);
    const response = await axios.get<JobResponse>(`${baseUrl}/job-info`, { params });
    // console.log('API response:', response.data);
    return {
      jobs: response.data.data.content,
      totalPages: response.data.data.totalPages
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Error response:', error.response?.data);
      console.error('Error config:', error.config);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}