'use client';

import { BookmarkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { fetchJobs } from '@/api/saramin/route';

import { Job } from '../recruit/job';

// FetchJobsParams 인터페이스를 직접 정의합니다.
interface FetchJobsParams {
  page: number;
  size: number;
  sort: string;
  techName?: string;
  locationName?: string[];
  experienceMin?: number;
  experienceMax?: number;
  search?: string;
}

const techStacks = [
  'Spring',
  'Java',
  'React',
  'Linux',
  'Python',
  'C++',
  'Javascript',
  'C',
] as const;
type TechStack = (typeof techStacks)[number];

const JobPreview: React.FC = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedTech, setSelectedTech] = useState<TechStack>('Spring');
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const params: FetchJobsParams = {
          page: 1,
          size: 3,
          sort: 'latest',
          techName: selectedTech,
        };
        const { jobs: fetchedJobs } = await fetchJobs(params);
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    void fetchJobsData();
  }, [selectedTech]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('jobBookmarks');
    if (savedBookmarks) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setBookmarks(new Set(JSON.parse(savedBookmarks)));
    }
  }, []);

  const handleViewAllJobs = () => {
    router.push('/recruit');
  };

  const toggleBookmark = (url: string) => {
    setBookmarks((prevBookmarks) => {
      const newBookmarks = new Set(prevBookmarks);
      if (newBookmarks.has(url)) {
        newBookmarks.delete(url);
      } else {
        newBookmarks.add(url);
      }
      localStorage.setItem('jobBookmarks', JSON.stringify(Array.from(newBookmarks)));
      return newBookmarks;
    });
  };

  const handleJobClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-bold">지금 뜨는 채용공고는?</h2>
      <div className="mb-4 flex space-x-2 overflow-x-auto">
        {techStacks.map((tech) => (
          <button
            key={tech}
            className={`rounded-full px-3 py-1 ${
              selectedTech === tech ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedTech(tech)}
          >
            {tech}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.url}
            className="relative cursor-pointer rounded-lg border p-4"
            onClick={() => handleJobClick(job.url)}
          >
            <button
              className="absolute right-2 top-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(job.url);
              }}
            >
              <BookmarkIcon
                className={`size-5 ${bookmarks.has(job.url) ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`}
              />
            </button>
            <h3 className="mb-2 font-bold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.companyName}</p>
            <p className="mt-2 text-sm text-gray-500">{job.experienceName}</p>
            <p className="text-sm text-gray-500">{job.locationName[0]}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button className="text-blue-500" onClick={handleViewAllJobs}>
          채용공고 모두보기
        </button>
        {/* <button className="text-blue-500">기술스택 설정</button> */}
      </div>
    </div>
  );
};

export default JobPreview;
