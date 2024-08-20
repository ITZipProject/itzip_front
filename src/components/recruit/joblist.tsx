'use client';

import React from 'react';
import { Job } from './job';

interface JobListProps {
  filteredJobs: Job[];
  handleBookmark: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({ filteredJobs, handleBookmark }) => {
  return (
    <div>
      {/* <div className="text-center text-lg mb-6">필터링된 공고 개수: {filteredJobs.length}</div> */}
      <hr className="my-6 border-blue-700"/>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredJobs.map((job) => (
          <div 
            key={job.id} 
            className="p-6 border-01 radius-01 cursor-pointer"
            onClick={() => window.open(job.url, '_blank')}
          >
            <h3 className="font-pre-body-01 text-center mb-2">{job.title}</h3>
            <p className="font-pre-body-02 text-center mb-2">{job.company}</p>
            <p className="font-pre-body-03 text-center text-gray-600 mb-4">{job.industry.name}</p>
            <p className="font-pre-body-04 text-center text-gray-600 mb-4">{job.location.name.split(' &gt;').join(' > ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
