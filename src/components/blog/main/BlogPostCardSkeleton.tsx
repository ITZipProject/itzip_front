import React from 'react';

const BlogPostCardSkeleton: React.FC = () => {
  return (
    <div className="flex h-[400px] w-full max-w-[300px] flex-col overflow-hidden">
      {/* Image placeholder - same size as the real image container */}
      <div className="relative h-[180px] rounded-lg bg-slate-200" />

      {/* Category and likes section */}
      <div className="flex items-center justify-between py-4 text-sm">
        <div className="flex items-center">
          <div className="flex items-center gap-2 pr-1">
            {/* Main category */}
            <div className="h-5 w-16 rounded bg-slate-200" />
            {/* Icon */}
            <div className="size-4 rounded bg-slate-200" />
            {/* Sub category */}
            <div className="h-5 w-20 rounded bg-slate-200" />
          </div>
        </div>
        {/* Likes count */}
        <div className="ml-auto h-5 w-20 rounded bg-slate-200" />
      </div>

      {/* Title and content */}
      <div className="grow">
        {/* Title */}
        <div className="mb-2 h-6 w-4/5 rounded bg-slate-200" />
        {/* Content - 3 lines */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-3/4 rounded bg-slate-200" />
        </div>
      </div>

      {/* Author section */}
      <div className="flex items-center py-4">
        {/* Profile image */}
        <div className="size-8 rounded-full bg-slate-200" />
        <div className="ml-3">
          {/* Author name */}
          <div className="mb-1 h-4 w-20 rounded bg-slate-200" />
          {/* Time ago */}
          <div className="h-3 w-16 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default BlogPostCardSkeleton;
