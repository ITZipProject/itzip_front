'use client';

import { BookmarkIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import { Job } from './job';

// import { fetchJobs } from '@/api/saramin/route';

function cleanLocationNames(locationNames: string[]): string[] {
  const uniqueLocations = new Set(
    locationNames.flatMap((name) => name.split(' > ')).filter((name) => name !== '&gt;'),
  );
  return Array.from(uniqueLocations);
}

interface JobListProps {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, currentPage, totalPages, onPageChange }) => {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load bookmarks from localStorage on component mount
    const savedBookmarks = localStorage.getItem('jobBookmarks');
    if (savedBookmarks) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setBookmarks(new Set(JSON.parse(savedBookmarks)));
    }
  }, []);

  useEffect(() => {
    // 필요한 경우 여기에 추가 로직
  }, [currentPage, sortOrder]);

  const handleSort = (order: 'latest' | 'oldest') => {
    setSortOrder(order);
    onPageChange(0); // 정렬 변경 시 첫 페이지로
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageChange(selected);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const toggleBookmark = (url: string) => {
    setBookmarks((prevBookmarks) => {
      const newBookmarks = new Set(prevBookmarks);
      if (newBookmarks.has(url)) {
        newBookmarks.delete(url);
      } else {
        newBookmarks.add(url);
      }
      // Save updated bookmarks to localStorage
      localStorage.setItem('jobBookmarks', JSON.stringify(Array.from(newBookmarks)));
      return newBookmarks;
    });
  };

  // 정렬 로직 (필요한 경우)
  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
    }
    return 0;
  });

  return (
    <div>
      <div className="mb-4 flex justify-end space-x-4">
        <button
          className={`font-pre-body-03 ${sortOrder === 'latest' ? 'font-bold text-blue-600' : 'text-gray-600'}`}
          onClick={() => handleSort('latest')}
        >
          최신순
        </button>
        <button
          className={`font-pre-body-03 ${sortOrder === 'oldest' ? 'font-bold text-blue-600' : 'text-gray-600'}`}
          onClick={() => handleSort('oldest')}
        >
          오래된순
        </button>
      </div>
      <hr className="my-6 border-blue-700" />
      <div className="grid grid-cols-2 gap-6">
        {sortedJobs.map((job) => (
          <div
            key={job.url}
            className="relative cursor-pointer p-6 border-01 radius-01"
            onClick={() => window.open(job.url, '_blank')}
          >
            <button
              className="absolute right-2 top-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(job.url);
              }}
            >
              <BookmarkIcon
                className={`size-6 ${bookmarks.has(job.url) ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`}
              />
            </button>
            <h3 className="font-pre-body-01 mb-2 text-center">{job.title}</h3>
            <p className="font-pre-body-02 mb-2 text-center">{job.companyName}</p>
            <p className="font-pre-body-03 mb-4 text-center text-gray-600">
              {job.jobName.slice(0, 3).join(', ')}
            </p>
            <p className="font-pre-body-04 mb-4 text-center text-gray-600">
              {cleanLocationNames(job.locationName).join(', ')}
            </p>
            <p className="font-pre-body-04 text-center text-gray-600">
              만료일: {formatDate(job.expirationDate)}
            </p>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination flex justify-center mt-8 space-x-2'}
        pageClassName={'px-3 py-2 rounded-lg border'}
        pageLinkClassName={'text-blue-500'}
        activeClassName={'bg-blue-500 text-white'}
        previousClassName={'px-3 py-2 rounded-lg border'}
        nextClassName={'px-3 py-2 rounded-lg border'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
        forcePage={currentPage}
      />
    </div>
  );
};

export default JobList;
