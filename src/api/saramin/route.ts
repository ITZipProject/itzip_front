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
    const response = await axios.get<JobResponse>(`${baseUrl}/job-info`, { params });
    return {
      jobs: response.data.data.content,
      totalPages: response.data.data.totalPages
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}