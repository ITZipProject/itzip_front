'use client';
import { useTransition, animated } from '@react-spring/web';
import React, { useState, useEffect } from 'react';

import { getCategoryById } from '@/types/blog/category';
import { ApiResponse, BlogPost, AnimatedStyleProps } from '@/types/blog/common';

import BlogPostCard from '../blog/main/BlogPostCard';
import BlogPostCardSkeleton from '../blog/main/BlogPostCardSkeleton';

const combineURLs = (baseURL: string, relativeURL: string): string => {
  return `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`;
};

const AnimatedBlogPostCard = animated(BlogPostCard);

const BlogPreview: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [postsToShow, setPostsToShow] = useState(4);
  const [loading, setLoading] = useState(true);
  const [initialFetchSize] = useState(4); // 초기 fetch 크기

  const transitions = useTransition<BlogPost, AnimatedStyleProps>(
    loading ? [] : posts.slice(0, postsToShow),
    {
      keys: (post) => post.id,
      from: { opacity: 0, transform: 'translateY(20px)' },
      enter: { opacity: 1, transform: 'translateY(0px)' },
      trail: 100,
      config: { tension: 300, friction: 20 },
    },
  );

  // resize 이벤트 핸들러
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(min-width: 768px) and (max-width: 992px)').matches) {
        setPostsToShow(3); // md size
      } else if (window.matchMedia('(max-width: 480px)').matches) {
        setPostsToShow(3); // smallest size
      } else {
        setPostsToShow(4); // default (sm and lg sizes)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 데이터 fetch는 initialFetchSize만 의존
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error('API URL이 설정되지 않았습니다.');
        }

        const apiUrl = combineURLs(process.env.NEXT_PUBLIC_API_URL, 'tech-info/posts/preview');
        const fullUrl = `${apiUrl}?sortType=LIKECOUNT&page=0&size=${initialFetchSize}`;

        const response = await fetch(fullUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          switch (response.status) {
            case 404:
              throw new Error(`404 Not Found - 해당 경로를 찾을 수 없습니다: ${fullUrl}`);
            case 401:
              throw new Error('401 Unauthorized - 인증이 필요합니다');
            case 403:
              throw new Error('403 Forbidden - 접근 권한이 없습니다');
            case 500:
              throw new Error('500 Internal Server Error - 서버 내부 오류가 발생했습니다');
            default:
              throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
          }
        }

        const responseText = await response.text();
        let data: ApiResponse;
        try {
          data = JSON.parse(responseText) as ApiResponse;
        } catch (parseError) {
          throw new Error('응답을 JSON으로 파싱할 수 없습니다. 서버 응답을 확인해주세요.');
        }

        if (!data.data.content || data.data.content.length === 0) {
          setPosts([]);
          return;
        }

        const transformedPosts: BlogPost[] = data.data.content.map((post) => {
          const categoryInfo = getCategoryById(post.categoryId);
          const timeAgo = getTimeAgo(new Date(post.createDate));

          return {
            id: post.postId,
            title: post.title,
            content: post.content,
            category: categoryInfo?.mainCategory || '기타',
            subCategory: categoryInfo?.subCategory || '기타',
            likes: post.likeCount,
            saves: 0,
            author: post.author,
            timeAgo,
            imageUrl: post.thumbnailImagePath,
            profileImageUrl: post.profileImagePath || '/default-profile.png',
          };
        });

        setPosts(transformedPosts);
      } catch (err) {
        console.error('Error details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, [initialFetchSize]);
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-36">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 ml-2 mt-24 text-3xl font-semibold leading-relaxed tracking-tight">
            지금 핫한 블로그 글은?
          </h2>
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: postsToShow }).map((_, index) => (
              <BlogPostCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-36">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 ml-2 mt-24 text-3xl font-semibold leading-relaxed tracking-tight">
          지금 핫한 블로그 글은?
        </h2>
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? // 로딩 중일 때만 스켈레톤 표시
              Array.from({ length: postsToShow }).map((_, index) => (
                <BlogPostCardSkeleton key={`skeleton-${index}`} />
              ))
            : // 데이터가 있을 때는 애니메이션된 카드 표시
              transitions((style, post) => (
                <AnimatedBlogPostCard style={style} key={post.id} {...post} />
              ))}
        </div>
      </div>
    </div>
  );
};

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  } else if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}분 전`;
  } else {
    return '방금 전';
  }
};

export default BlogPreview;
