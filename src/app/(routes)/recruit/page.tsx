"use client";

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface Job {
  id: string;
  category: string;
  technology: string;
  location: string;
  education: string;
  experience: string;
  companyName: string;
  title: string;
  postedDate: string;
  recommendations: number;
  views: number;
  companyImage: string;
  url: string;
}

const RecruitPage: React.FC = () => {
  const dummyJobs: Job[] = [
    {
      id: '1',
      category: 'Software',
      technology: 'React',
      location: 'Seoul',
      education: 'Bachelor',
      experience: '2 years',
      companyName: 'Tech Corp',
      title: 'Frontend Developer',
      postedDate: '2023-07-01',
      recommendations: 5,
      views: 150,
      companyImage: 'https://via.placeholder.com/100',
      url: 'https://example.com/job/1',
    },
    {
      id: '2',
      category: 'Software',
      technology: 'Node.js',
      location: 'Busan',
      education: 'Master',
      experience: '5 years',
      companyName: 'Web Solutions',
      title: 'Backend Developer',
      postedDate: '2023-06-25',
      recommendations: 8,
      views: 200,
      companyImage: 'https://via.placeholder.com/100',
      url: 'https://example.com/job/2',
    },
    // 추가적인 더미 데이터...
  ];

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
      tempJobs = tempJobs.filter(job => job.category.includes(filters.category));
    }
    if (filters.technology) {
      tempJobs = tempJobs.filter(job => job.technology.includes(filters.technology));
    }
    if (filters.location) {
      tempJobs = tempJobs.filter(job => job.location.includes(filters.location));
    }
    if (filters.education) {
      tempJobs = tempJobs.filter(job => job.education.includes(filters.education));
    }
    if (filters.experience) {
      tempJobs = tempJobs.filter(job => job.experience.includes(filters.experience));
    }
    if (filters.search) {
      tempJobs = tempJobs.filter(
        job =>
          job.companyName.includes(filters.search) || job.title.includes(filters.search)
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

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleBookmark = (jobId: string) => {
    // Bookmark functionality
  };

  return (
    <div>
      <h1>채용 정보 목록</h1>
      <button onClick={toggleFilterModal}>필터링</button>
      <Modal isOpen={isFilterModalOpen} onRequestClose={toggleFilterModal}>
        <div>
          <h2>필터링</h2>
          <label>카테고리:
            <input
              type="text"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            />
          </label>
          <label>기술:
            <input
              type="text"
              name="technology"
              value={filters.technology}
              onChange={handleFilterChange}
            />
          </label>
          <label>지역:
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </label>
          <label>학력:
            <input
              type="text"
              name="education"
              value={filters.education}
              onChange={handleFilterChange}
            />
          </label>
          <label>경력:
            <input
              type="text"
              name="experience"
              value={filters.experience}
              onChange={handleFilterChange}
            />
          </label>
          <label>검색:
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </label>
          <label>정렬:
            <select name="sort" value={filters.sort} onChange={handleFilterChange}>
              <option value="latest">최신 순</option>
              <option value="recommendation">추천수 순</option>
              <option value="views">조회수 순</option>
            </select>
          </label>
          <button onClick={applyFilters}>적용</button>
          <button onClick={toggleFilterModal}>닫기</button>
        </div>
      </Modal>
      <div>필터링된 공고 개수: {filteredJobs.length}</div>
      <div className="job-list">
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card">
            <img src={job.companyImage} alt={job.companyName} />
            <h3>{job.title}</h3>
            <p>{job.companyName}</p>
            <button onClick={() => window.location.href = job.url}>이동</button>
            <button onClick={() => handleBookmark(job.id)}>북마크</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitPage;
