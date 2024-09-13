'use client';

import React, { useState, useEffect } from 'react';
import { Job } from './job';  // Job 인터페이스의 정확한 경로를 확인하세요
import Pagination from '../common/multipage';
import { fetchJobs } from '@/api/saramin/route';

// cleanLocationNames 함수 정의
function cleanLocationNames(locationNames: string[]): string[] {
  const uniqueLocations = new Set(locationNames.filter(name => name !== "&gt;"));
  return Array.from(uniqueLocations);
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | null>(null);

  useEffect(() => {
    loadJobs();
  }, [currentPage, sortOrder]);

  const loadJobs = async () => {
    const sortParam = sortOrder === 'latest' ? 'expirationDate,desc' : sortOrder === 'oldest' ? 'expirationDate,asc' : '';
    try {
      const result = await fetchJobs({ page: currentPage - 1, size: 20, sort: sortParam });
      setJobs(result.jobs);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error loading jobs:', error);
      // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
    }
  };

  const handleSort = (order: 'latest' | 'oldest') => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {year: 'numeric', month: 'long', day: 'numeric'});
  };

  return (
    <div>
      <div className="flex justify-end mb-4 space-x-4">
        <button 
          className={`font-pre-body-03 ${sortOrder === 'latest' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
          onClick={() => handleSort('latest')}
        >
          최신순
        </button>
        <button 
          className={`font-pre-body-03 ${sortOrder === 'oldest' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
          onClick={() => handleSort('oldest')}
        >
          오래된순
        </button>
      </div>
      <hr className="my-6 border-blue-700"/>
      <div className="grid grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className="p-6 border-01 radius-01 cursor-pointer"
            onClick={() => window.open(job.url, '_blank')}
          >
            <h3 className="font-pre-body-01 text-center mb-2">{job.title}</h3>
            <p className="font-pre-body-02 text-center mb-2">{job.companyName}</p>
            <p className="font-pre-body-03 text-center text-gray-600 mb-4">
              {job.jobName.slice(0, 3).join(', ')}
            </p>
            <p className="font-pre-body-04 text-center text-gray-600 mb-4">
              {cleanLocationNames(job.locationName).join(', ')}
            </p>
            <p className="font-pre-body-04 text-center text-gray-600">
              만료일: {formatDate(job.expirationDate)}
            </p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default JobList;