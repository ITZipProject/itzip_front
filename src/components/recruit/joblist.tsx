'use client';

import React, { useState } from 'react';
import { Job } from './job';
import { timeStamp } from 'console';

interface JobListProps {
  filteredJobs: Job[];
  handleBookmark: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({ filteredJobs, handleBookmark }) => {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | null>(null);

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === null) return 0;
    return sortOrder === 'latest' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
  });

  const handleSort = (order: 'latest' | 'oldest') => {
    setSortOrder(order);
  };

  const formatDate = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);
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
      {/* <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"> */}
      <div className="grid grid-cols-2 gap-6">
        {sortedJobs.map((job) => (
          <div 
            key={job.id} 
            className="p-6 border-01 radius-01 cursor-pointer"
            onClick={() => window.open(job.url, '_blank')}
          >
            <h3 className="font-pre-body-01 text-center mb-2">{job.title}</h3>
            <p className="font-pre-body-02 text-center mb-2">{job.company}</p>
            {/* <p className="font-pre-body-03 text-center text-gray-600 mb-4">{job.industry.name}</p> */}
            <p className="font-pre-body-03 text-center text-gray-600 mb-4">
              {job.jobCode.name.split(',').slice(0, 3).join(', ')}
            </p>
            <p className="font-pre-body-04 text-center text-gray-600 mb-4">{job.location.name.split(' &gt;').join(' > ')}</p>
            <p className="font-pre-body-04 text-center text-gray-600">
              게시일: {formatDate(job.timestamp)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;