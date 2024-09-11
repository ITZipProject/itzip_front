'use client';

import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../../api/saramin/route';
import { Job } from '@/components/recruit/job';
import Filters from '@/components/recruit/filters';
import JobList from '@/components/recruit/joblist';

const RecruitPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    education: '',
    experience: '',
    search: '',
    sort: 'latest',
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const jobsData = await fetchJobs();
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let tempJobs: Job[] = [...jobs];

    if (filters.technology) {
      tempJobs = tempJobs.filter((job) => job.jobCode.code.includes(filters.technology));
    }
    if (filters.location) {
      tempJobs = tempJobs.filter((job) =>
        job.location.name.split(' &gt; ')[0].includes(filters.location),
      );
    }
    if (filters.education) {
      tempJobs = tempJobs.filter((job) =>
        job.requiredEducationLevel.code.includes(filters.education),
      );
    }
    if (filters.experience) {
      tempJobs = tempJobs.filter((job) =>
        job.experienceLevel.code.toString().includes(filters.experience),
      );
    }
    if (filters.search) {
      tempJobs = tempJobs.filter(
        (job) => job.industry.name.includes(filters.search) || job.title.includes(filters.search),
      );
    }

    if (filters.sort === 'latest') {
      tempJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (filters.sort === 'recommendation') {
      tempJobs.sort((a, b) => b.recommendations - a.recommendations);
    } else if (filters.sort === 'views') {
      tempJobs.sort((a, b) => b.views - a.views);
    }

    setFilteredJobs(tempJobs);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookmark = (jobId: string) => {
    // Bookmark functionality
  };

  const toggleFilter = (filterName: string) => {
    if (activeFilter === filterName) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterName);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex justify-center">
        <h1 className="font-pre-heading-01 text-blue-500">채용정보</h1>
        <h1 className="font-pre-heading-01">&nbsp;둘러보기</h1>
        <br />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/5">
          <Filters
            filters={filters}
            activeFilter={activeFilter}
            setFilters={setFilters}
            toggleFilter={toggleFilter}
            handleFilterChange={handleFilterChange}
            applyFilters={applyFilters}
          />
        </div>
        <div className="w-4/5">
          <JobList filteredJobs={filteredJobs} handleBookmark={handleBookmark} />
        </div>
      </div>
    </div>
  );
};

export default RecruitPage;