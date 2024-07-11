"use client";

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface Job {
  id: string;
  title: string;
  industry: {
    code: string;
    name: string;
  };
  location: {
    code: string;
    name: string;
  };
  jobType: {
    code: string;
    name: string;
  };
  jobMidCode: {
    code: string;
    name: string;
  };
  jobCode: {
    code: string;
    name: string;
  };
  experienceLevel: {
    code: number;
    min: number;
    max: number;
    name: string;
  };
  requiredEducationLevel: {
    code: string;
    name: string;
  };
  postedDate: string;
  recommendations: number;
  views: number;
  companyImage: string;
  url: string;
}

const dummyJobs: Job[] = [
  {
    id: '1',
    title: '[글로벌 AI SaaS][스타트업] 백엔드 서버개발자 채용',
    industry: { code: '301', name: '솔루션·SI·ERP·CRM' },
    location: { code: '101240', name: '서울 > 중구' },
    jobType: { code: '1,10,2', name: '정규직,계약직 (정규직 전환가능),계약직' },
    jobMidCode: { code: '2', name: 'IT개발·데이터' },
    jobCode: { code: '201,236,258,302,89,92,118,127,136,142,201,202,221,258,284,284', name: '소프트웨어개발,AWS,Javascript,Node.js,TypeScript,유지보수,프론트엔드,솔루션,인프라,클라우드,API,Azure,GCP,SaaS' },
    experienceLevel: { code: 3, min: 3, max: 0, name: '신입/경력' },
    requiredEducationLevel: { code: '8', name: '대학교졸업(4년)이상' },
    postedDate: '2023-07-01',
    recommendations: 5,
    views: 150,
    companyImage: 'https://via.placeholder.com/100',
    url: 'https://example.com/job/1',
  },
  {
    id: '2',
    title: '[글로벌 AI SaaS][스타트업] 프론트엔드 개발자 채용',
    industry: { code: '301', name: '솔루션·SI·ERP·CRM' },
    location: { code: '101240', name: '서울 > 중구' },
    jobType: { code: '1,10,2', name: '정규직,계약직 (정규직 전환가능),계약직' },
    jobMidCode: { code: '2', name: 'IT개발·데이터' },
    jobCode: { code: '201,236,258,302,89,92,118,127,136,142,201,202,221,258,284,284', name: '소프트웨어개발,AWS,Javascript,Node.js,TypeScript,유지보수,프론트엔드,솔루션,인프라,클라우드,API,Azure,GCP,SaaS' },
    experienceLevel: { code: 3, min: 3, max: 0, name: '신입/경력' },
    requiredEducationLevel: { code: '8', name: '대학교졸업(4년)이상' },
    postedDate: '2023-06-25',
    recommendations: 8,
    views: 200,
    companyImage: 'https://via.placeholder.com/100',
    url: 'https://example.com/job/2',
  },
  // 추가적인 더미 데이터...
];

const RecruitPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(dummyJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(dummyJobs);
  const [filters, setFilters] = useState({
    category: '',
    technology: '',
    location: '',
    education: '',
    experience: '',
    search: '',
    sort: 'latest',
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const applyFilters = () => {
    let tempJobs: Job[] = [...jobs];
  
    if (filters.category) {
      tempJobs = tempJobs.filter(job => job.jobMidCode.code === filters.category);
    }
    if (filters.technology) {
      tempJobs = tempJobs.filter(job => job.jobCode.code.includes(filters.technology));
    }
    if (filters.location) {
      tempJobs = tempJobs.filter(job => job.location.code === filters.location);
    }
    if (filters.education) {
      tempJobs = tempJobs.filter(job => job.requiredEducationLevel.code === filters.education);
    }
    if (filters.experience) {
      tempJobs = tempJobs.filter(job => job.experienceLevel.code === parseInt(filters.experience));
    }
    if (filters.search) {
      const searchString = filters.search.toLowerCase();
      tempJobs = tempJobs.filter(
        job =>
          job.industry.name.toLowerCase().includes(searchString) ||
          job.title.toLowerCase().includes(searchString)
      );
    }
  
    // 정렬 로직은 그대로 유지됩니다
  
    setFilteredJobs(tempJobs);
  };
  

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleBookmark = (jobId: string) => {
    // Bookmark functionality
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-center text-3xl font-bold mb-6">채용 정보 목록</h1>
      <button
        className="block mx-auto mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={toggleFilterModal}
      >
        필터링
      </button>
      <Modal isOpen={isFilterModalOpen} onRequestClose={toggleFilterModal}>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">필터링</h2>
          <label className="block mb-2">
            카테고리:
            <input
              type="text"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            기술:
            <input
              type="text"
              name="technology"
              value={filters.technology}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            지역:
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            학력:
            <input
              type="text"
              name="education"
              value={filters.education}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            경력:
            <input
              type="text"
              name="experience"
              value={filters.experience}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            검색:
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            정렬:
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="applys">지원자 순</option>
              <option value="views">조회수 순</option>
            </select>
          </label>
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={applyFilters}
            >
              적용
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={toggleFilterModal}
            >
              닫기
            </button>
          </div>
        </div>
      </Modal>
      <div className="text-center text-lg mb-6">필터링된 공고 개수: {filteredJobs.length}</div>
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="p-6 border border-gray-300 rounded-lg shadow-lg">
            <img src={job.companyImage} alt={job.industry.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-bold text-center mb-2">{job.title}</h3>
            <p className="text-center text-gray-600 mb-4">{job.industry.name}</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => window.location.href = job.url}
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

export default RecruitPage;
