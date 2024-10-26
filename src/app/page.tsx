'use client';

import BlogPreview from '@/components/main/BlogPreview';
import JobPreview from '@/components/main/JobPreview';
import StudyPreview from '@/components/main/StudyPreview';

export default function Home() {
  return (
    <div>
      <JobPreview />
      <BlogPreview />
      <StudyPreview />
    </div>
  );
}
