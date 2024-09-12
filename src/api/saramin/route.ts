import axios from 'axios';
import { Job, JobResponse } from '@/components/recruit/job';

const baseUrl = 'http://3.39.78.0:8080/api/job-info?page=10&size=10&sort=%5B%22string%22%5D';

export async function fetchJobs(params: {
  page: number;
  size: number;
  sort?: string;
}): Promise<{ jobs: Job[]; totalPages: number; totalElements: number }> {
  try {
    const response = await axios.get<JobResponse>(`${baseUrl}/job-info`, { params });
    return {
      jobs: response.data.data.content,
      totalPages: response.data.data.totalPages,
      totalElements: response.data.data.totalElements
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return { jobs: [], totalPages: 0, totalElements: 0 };
  }
}