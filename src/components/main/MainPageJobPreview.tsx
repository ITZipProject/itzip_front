'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '../recruit/job';
import { fetchJobs } from '@/api/saramin/route';
import { BookmarkIcon } from 'lucide-react';

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

const techStacks = ['Spring', 'Java', 'React', 'Linux', 'Python', 'C++', 'Javascript', 'C'] as const;
type TechStack = typeof techStacks[number];

const MainPageJobPreview: React.FC = () => {
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
          techName: selectedTech
        };
        const { jobs: fetchedJobs } = await fetchJobs(params);
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobsData();
  }, [selectedTech]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('jobBookmarks');
    if (savedBookmarks) {
      setBookmarks(new Set(JSON.parse(savedBookmarks)));
    }
  }, []);

  const handleViewAllJobs = () => {
    router.push('/recruit');
  };

  const toggleBookmark = (url: string) => {
    setBookmarks(prevBookmarks => {
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
      <h2 className="text-xl font-bold mb-4">지금 뜨는 채용공고는?</h2>
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {techStacks.map(tech => (
          <button
            key={tech}
            className={`px-3 py-1 rounded-full ${
              selectedTech === tech ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedTech(tech)}
          >
            {tech}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {jobs.map(job => (
          <div 
            key={job.url} 
            className="border p-4 rounded-lg relative cursor-pointer"
            onClick={() => handleJobClick(job.url)}
          >
            <button
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(job.url);
              }}
            >
              <BookmarkIcon
                className={`h-5 w-5 ${bookmarks.has(job.url) ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`}
              />
            </button>
            <h3 className="font-bold mb-2">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.companyName}</p>
            <p className="text-sm text-gray-500 mt-2">{job.experienceName}</p>
            <p className="text-sm text-gray-500">{job.locationName[0]}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button className="text-blue-500" onClick={handleViewAllJobs}>채용공고 모두보기</button>
        {/* <button className="text-blue-500">기술스택 설정</button> */}
      </div>
    </div>
  );
};

export default MainPageJobPreview;