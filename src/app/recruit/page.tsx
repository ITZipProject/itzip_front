'use client';

import React, { useEffect, useState, useCallback } from 'react';

import Filters from '@/components/recruit/filters';
import { Job } from '@/components/recruit/job';
import JobList from '@/components/recruit/joblist';

import { fetchJobs } from '../../api/saramin/route';

const RecruitPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    techName: '',
    locationName: [] as string[],
    experienceMin: 0,
    experienceMax: 10,
    search: '',
    sort: 'expirationDate,desc',
  });

  const fetchJobData = useCallback(async () => {
    try {
      const response = await fetchJobs({
        page: currentPage - 1,
        size: 20,
        ...filters,
      });
      setJobs(response.jobs);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }, [currentPage, filters]); // 의존성에 필요한 값들만 포함

  useEffect(() => {
    void fetchJobData();
  }, [fetchJobData]); // fetchJobData만 의존성으로 설정

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []); // 의존성 없음

  const applyFilters = useCallback(() => {
    setCurrentPage(1);
    void fetchJobData();
  }, [fetchJobData]); // fetchJobData를 의존성으로 추가

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex justify-center">
        <h1 className="font-pre-heading-01 text-blue-500">채용정보</h1>
        <h1 className="font-pre-heading-01">&nbsp;둘러보기</h1>
      </div>
      <div className="flex space-x-4">
        <div className="w-spacing-19 shrink-0">
          <Filters filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
        </div>
        <div className="grow">
          <JobList
            jobs={jobs}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruitPage;
