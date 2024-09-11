import axios from 'axios';
import { Job } from '@/components/recruit/job';

const baseUrl = 'https://00f935c6-42a5-448a-8871-ff95c8a2f12a.mock.pstmn.io';

export async function fetchJobs(): Promise<Job[]> {
  try {
    const response = await axios.get(`${baseUrl}/job-search`);
    return response.data.jobs.job.map((job: any) => {
      return {
        id: job.id,
        company: job.company.detail.name,
        title: job.position.title,
        industry: job.position.industry,
        location: job.position.location,
        jobType: job.position['job-type'],
        jobMidCode: job.position['job-mid-code'],
        jobCode: job.position['job-code'],
        experienceLevel: job.position['experience-level'],
        requiredEducationLevel: job.position['required-education-level'],
        postedDate: job['posting-timestamp'] ? new Date(parseInt(job['posting-timestamp']) * 1000).toISOString() : null,
        timestamp: job['posting-timestamp'] ? parseInt(job['posting-timestamp']) : null,
        recommendations: job.recommendations || 0,
        views: job.views || 0,
        companyImage: job.companyImage || '',
        url: job.url,
      };
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}