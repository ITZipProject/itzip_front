// src/app/saramin/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  postingDate: string;
  expirationDate: string;
}

const SaraminPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/saramin');
        if (!response.ok) {
          throw new Error('채용 정보를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div>
      <h1>채용 정보</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>회사: {job.company}</p>
            <p>게시일: {job.postingDate}</p>
            <p>마감일: {job.expirationDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaraminPage;
