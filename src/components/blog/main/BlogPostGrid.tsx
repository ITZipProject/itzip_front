'use client';
import { useTransition, animated } from '@react-spring/web';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { blogFilterAtom } from '@/store/blogFilterAtom';
import { getCategoryById } from '@/types/blog/category';
import { ApiResponse, BlogPost, AnimatedStyleProps } from '@/types/blog/common';

import BlogPagination from './BlogPagination';
import BlogPostCard from './BlogPostCard';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';

const POSTS_PER_PAGE = 12;
const AnimatedBlogPostCard = animated(BlogPostCard);

const combineURLs = (baseURL: string, relativeURL: string): string => {
  return `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`;
};
const EmptyState: React.FC = () => (
  <div className="bg-gray-50 col-span-full flex h-[400px] w-full flex-col items-center justify-center rounded-lg p-8">
    <div className="mb-4"></div>
    <h3 className="mb-2 text-lg font-medium text-gray-900">게시글이 없습니다</h3>
    <p className="text-center text-sm text-gray-500">
      선택하신 카테고리에 해당하는 게시글이 아직 없습니다.
      <br />
      다른 카테고리를 선택하시거나 첫 게시글을 작성해보세요.
    </p>
    <Link
      href="/blog/editor"
      className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      글쓰기
    </Link>
  </div>
);
const BlogPostGrid: React.FC = () => {
  const [filter, setFilter] = useAtom(blogFilterAtom);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transitions = useTransition<BlogPost, AnimatedStyleProps>(loading ? [] : posts, {
    keys: (post) => post.id,
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    trail: 50,
    config: { tension: 300, friction: 20 },
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      setPosts([]); // 새로운 요청 시작 시 posts 초기화

      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error('API URL이 설정되지 않았습니다.');
        }

        const apiUrl = combineURLs(process.env.NEXT_PUBLIC_API_URL, 'tech-info/posts/preview');
        const queryParams = new URLSearchParams({
          sortType: filter.sortType,
          page: filter.page.toString(),
          size: filter.size.toString(),
        });

        if (filter.categoryId) {
          queryParams.append('categoryId', filter.categoryId);
        }

        const fullUrl = `${apiUrl}?${queryParams.toString()}`;

        const response = await fetch(fullUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          signal: controller.signal, // AbortController 시그널 추가
        });

        if (!response.ok) {
          if (response.status === 404) {
            setPosts([]);
            setTotalPages(0);
            setLoading(false);
            return;
          }
          throw new Error('게시글을 불러오는데 실패했습니다.');
        }

        const data = (await response.json()) as ApiResponse;

        if (!data.data.content || data.data.content.length === 0) {
          setPosts([]);
          setTotalPages(0);
          setLoading(false);
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

        // 요청이 취소되지 않은 경우에만 상태 업데이트
        if (!controller.signal.aborted) {
          setPosts(transformedPosts);
          setTotalPages(data.data.page.totalPages);
        }
      } catch (err) {
        // AbortError는 무시
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchPosts();

    // cleanup 함수에서 진행 중인 요청 취소
    return () => {
      controller.abort();
    };
  }, [filter]); // filter 변경 시 데이터 다시 로드

  const handlePageChange = (page: number) => {
    setFilter((prev) => ({
      ...prev,
      page: page - 1, // API는 0-based index 사용
    }));
    window.scrollTo(0, 0);
  };

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-lg bg-red-50 p-4">
          <div className="text-red-800">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden px-4">
      <div className="grid justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
            <BlogPostCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : posts.length === 0 ? (
          <EmptyState />
        ) : (
          transitions((style, post) => (
            <AnimatedBlogPostCard style={style} key={post.id} {...post} />
          ))
        )}
      </div>
      {!loading && posts.length > 0 && (
        <BlogPagination
          currentPage={filter.page + 1} // UI는 1-based index 사용
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
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

export default BlogPostGrid;
