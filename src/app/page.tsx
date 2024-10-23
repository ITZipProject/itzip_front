'use client';

import BlogPreview from '@/components/main/BlogPreview';
import MainPageJobPreview from '@/components/main/MainPageJobPreview';
import StudyPreview from '@/components/main/StudyPreview';

export default function Home() {
  return (
    <div>
      <MainPageJobPreview />
      <BlogPreview />
      <StudyPreview />
    </div>
  );
}
