import axios from 'axios';
import { Job } from '@/components/recruit/job';

const baseUrl = 'http://3.39.78.0:8080/api';

interface JobResponse {
  status: string;
  msg: string;
  data: {
    totalElements: number;
    totalPages: number;
    content: Job[];
    // 필요한 경우 다른 필드들을 여기에 추가하세요
  };
  code: string;
}

export async function fetchJobs(params: {
  page?: number;
  size?: number;
  sort?: string;
} = {}): Promise<{ jobs: Job[]; totalPages: number }> {
  const page = params.page ?? 0;
  const size = params.size ?? 20;
  const sort = params.sort ? encodeURIComponent(`["${params.sort}"]`) : '%5B%22string%22%5D';
  
  const url = `${baseUrl}/job-info?page=${page}&size=${size}&sort=${sort}`;

  try {
    const response = await axios.get<JobResponse>(url);
    
    return {
      jobs: response.data.data.content,
      totalPages: response.data.data.totalPages
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}