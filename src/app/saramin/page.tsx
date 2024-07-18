"use client";

import { useEffect, useState } from 'react';
import { fetchJobs, Job } from '../../api/saramin/route';

const SaraminPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobsData = await fetchJobs();
      setJobs(jobsData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>취업 정보</h1>
      <br />
      <div>
        {jobs.map(job => (
          <div key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.industry.name}</p>
            <p>{job.location.name}</p>
            <p>{job.jobType.name}</p>
            <p>{job.experienceLevel.name}</p>
            <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>자세히 보기</a>
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaraminPage;
