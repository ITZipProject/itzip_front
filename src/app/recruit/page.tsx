'use client';

import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../../api/saramin/route';
import { Job } from '@/components/recruit/job';
import Filters from '@/components/recruit/filters';
import JobList from '@/components/recruit/joblist';

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

  useEffect(() => {
    fetchJobData();
  }, [currentPage, filters.techName, filters.locationName, filters.experienceMin, filters.experienceMax, filters.search, filters.sort]);

  const fetchJobData = async () => {
    try {
      const response = await fetchJobs({
        page: currentPage - 1,
        size: 20,
        ...filters  // 모든 필터 값 전달
      });
      setJobs(response.jobs);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchJobData();
  };

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex justify-center">
        <h1 className="font-pre-heading-01 text-blue-500">채용정보</h1>
        <h1 className="font-pre-heading-01">&nbsp;둘러보기</h1>
      </div>
      <div className="flex space-x-4">
        <div className="w-[200px] flex-shrink-0">
          <Filters
            filters={filters}
            setFilters={setFilters}
            applyFilters={applyFilters}
          />
        </div>
        <div className="flex-grow">
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