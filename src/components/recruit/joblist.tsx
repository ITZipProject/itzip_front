'use client';

import React from 'react';
import { Job } from '../../api/saramin/route';

interface JobListProps {
  filteredJobs: Job[];
  handleBookmark: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({ filteredJobs, handleBookmark }) => {
  return (
    <div>
      <div className="text-center text-lg mb-6">필터링된 공고 개수: {filteredJobs.length}</div>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="p-6 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold text-center mb-2">{job.title}</h3>
            <p className="text-lg text-center mb-2">{job.company}</p>
            <p className="text-center text-gray-600 mb-4">{job.industry.name}</p>
            <p className="text-center text-gray-600 mb-4">{job.location.name.split(' &gt;')}</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => window.open(job.url, '_blank')}
              >
                이동
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => handleBookmark(job.id)}
              >
                북마크
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
