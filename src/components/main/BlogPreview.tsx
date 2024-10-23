'use client';
import React, { useState, useEffect } from 'react';

import { getCategoryById } from '@/types/blog/category';

import BlogPostCard from '../blog/main/BlogPostCard';

interface PostPreviewResponse {
  postId: string;
  categoryId: string;
  title: string;
  content: string;
  thumbnailImagePath: string;
  likeCount: number;
  profileImagePath: string;
  author: string;
  createDate: string;
  links: Array<any>;
}

interface ApiResponse {
  status: string;
  msg: string;
  data: {
    content: PostPreviewResponse[];
    links: Array<any>;
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  };
  code: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  likes: number;
  saves: number;
  author: string;
  timeAgo: string;
  imageUrl: string;
  profileImageUrl: string;
}

const combineURLs = (baseURL: string, relativeURL: string): string => {
  return `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`;
};

const BlogPreview: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [postsToShow, setPostsToShow] = useState(4);

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

    // 초기 실행
    handleResize();

    // resize 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error('API URL이 설정되지 않았습니다.');
        }

        const apiUrl = combineURLs(process.env.NEXT_PUBLIC_API_URL, 'tech-info/posts/preview');
        const fullUrl = `${apiUrl}?sortType=LIKECOUNT&page=0&size=${postsToShow}`;

        console.log('Fetching posts from:', fullUrl);

        const response = await fetch(fullUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);

        const responseText = await response.text();
        console.log('Raw response:', responseText);

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

        let data: ApiResponse;
        try {
          data = JSON.parse(responseText) as ApiResponse;
        } catch (parseError) {
          console.error('JSON 파싱 에러:', parseError);
          console.error('받은 응답:', responseText);
          throw new Error('응답을 JSON으로 파싱할 수 없습니다. 서버 응답을 확인해주세요.');
        }

        if (!data.data.content || data.data.content.length === 0) {
          console.log('No posts found in response');
          setPosts([]);
          return;
        }

        console.log('Posts found:', data.data.content.length);

        const transformedPosts: Post[] = data.data.content.map((post) => {
          const categoryInfo = getCategoryById(post.categoryId);
          const timeAgo = getTimeAgo(new Date(post.createDate));

          return {
            id: post.postId,
            title: post.title,
            content: post.content,
            category: categoryInfo?.mainCategory || '기타',
            subCategory: categoryInfo?.subCategory || '기타',
            likes: post.likeCount,
            saves: 0, // 기본값 설정
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
      }
    };

    void fetchPosts();
  }, [postsToShow]); // postsToShow가 변경될 때마다 새로 fetch

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <div className="text-red-800">에러가 발생했습니다: {error}</div>
        <div className="mt-2 text-sm text-red-600">
          개발자 도구의 콘솔에서 자세한 에러 내용을 확인할 수 있습니다.
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-lg bg-blue-50 p-4">
        <div className="text-blue-800">현재 등록된 게시글이 없습니다.</div>
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
          {posts.slice(0, postsToShow).map((post) => (
            <BlogPostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

// 시간 경과 계산 헬퍼 함수
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
