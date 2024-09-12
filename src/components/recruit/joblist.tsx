'use client';

import React, { useState } from 'react';
import { Job } from './job';
import Pagination from '../common/multipage';

interface JobListProps {
  filteredJobs: Job[];
}

// 지역명을 정리하는 함수
function cleanLocationNames(locationNames: string[]): string[] {
  const uniqueLocations = new Set(locationNames.filter(name => name !== "&gt;"));
  return Array.from(uniqueLocations);
}

const JobList: React.FC<JobListProps> = ({ filteredJobs }) => {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === null) return 0;
    return sortOrder === 'latest' 
      ? new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime() 
      : new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
  });

  const handleSort = (order: 'latest' | 'oldest') => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {year: 'numeric', month: 'long', day: 'numeric'});
  };

  const pageCount = Math.ceil(sortedJobs.length / jobsPerPage);
  const offset = (currentPage - 1) * jobsPerPage;
  const currentJobs = sortedJobs.slice(offset, offset + jobsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        {currentJobs.map((job) => (
          <div 
            key={job.title} 
            className="p-6 border-01 radius-01 cursor-pointer"
            // onClick={() => window.open(job.url, '_blank')}
          >
            <h3 className="font-pre-body-01 text-center mb-2">{job.title}</h3>
            {/* <p className="font-pre-body-02 text-center mb-2">{job.companyName}</p> */}
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
        totalPages={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default JobList;