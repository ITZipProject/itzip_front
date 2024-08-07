import axios from 'axios';
import { Job } from '@/components/recruit/job';

const baseUrl = 'https://00f935c6-42a5-448a-8871-ff95c8a2f12a.mock.pstmn.io';


export async function fetchJobs(): Promise<Job[]> {
  try {
    const response = await axios.get(`${baseUrl}/job-search`);
    return response.data.jobs.job.map((job: any) => ({
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
      // postedDate: moment.unix(job.posting-timestamp).format('YYYY-MM-DD'),
      recommendations: 0, // Recommendation 정보가 없어서 0으로 임시 설정
      views: 0, // Views 정보가 없어서 0으로 임시 설정
      companyImage: '', // 회사 이미지 정보가 없어서 빈 문자열로 임시 설정
      url: job.url,
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
