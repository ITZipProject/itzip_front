import axios from 'axios';
import { Job, JobResponse } from '@/components/recruit/job';

const baseUrl = 'http://3.39.78.0:8080/api/tech';

export async function fetchJobs(params: {
  search?: string;
  techName?: string;
  experienceMin?: number;
  experienceMax?: number;
  page?: number;
  size?: number;
}): Promise<Job[]> {
  try {
    const response = await axios.get<JobResponse>(`${baseUrl}/job-search`, { params });
    return response.data.data.content;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}