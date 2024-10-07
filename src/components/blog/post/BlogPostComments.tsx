'use client';

import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef } from 'react';

import CommentOptionsModal from './CommentOptionsModal';
import BlogPagination from '../main/BlogPagination';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  profileImage: string;
}

interface BlogPostCommentsProps {
  postId: number;
}

const COMMENTS_PER_PAGE = 10;

const BlogPostComments: React.FC<BlogPostCommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [openModalId, setOpenModalId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchComments = useCallback(
    async (
      page: number,
    ): Promise<{
      comments: Comment[];
      totalPages: number;
      totalComments: number;
    }> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const totalComments = 50;
      const totalPages = Math.ceil(totalComments / COMMENTS_PER_PAGE);

      const start = (page - 1) * COMMENTS_PER_PAGE;
      const end = Math.min(start + COMMENTS_PER_PAGE, totalComments);

      const comments = Array.from({ length: end - start }, (_, index) => ({
        id: start + index + 1,
        author: `User ${start + index + 1}`,
        content: `This is comment number ${start + index + 1} for post ${postId}`,
        date: new Date().toLocaleString(),
        profileImage: `https://picsum.photos/seed/user${start + index + 1}/48/48`,
      }));

      return { comments, totalPages, totalComments };
    },
    [postId],
  );

  useEffect(() => {
    const loadComments = async () => {
      try {
        const { comments, totalPages, totalComments } = await fetchComments(currentPage);
        setComments(comments);
        setTotalPages(totalPages);
        setTotalComments(totalComments);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    void loadComments();
  }, [currentPage, fetchComments]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenModalId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: totalComments + 1,
        author: 'Current User',
        content: newComment,
        date: new Date().toLocaleString(),
        profileImage: `https://picsum.photos/seed/user${totalComments + 1}/48/48`,
      };
      setComments((prevComments) => [newCommentObj, ...prevComments]);
      setTotalComments((prev) => prev + 1);
      setNewComment('');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditComment = (commentId: number) => {
    console.log('Edit comment', commentId);
    setOpenModalId(null);
  };

  const handleDeleteComment = (commentId: number) => {
    console.log('Delete comment', commentId);
    setOpenModalId(null);
  };

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-lg font-medium">댓글 {totalComments}</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!</p>
      ) : (
        <>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-6 border-b pb-4">
              <div className="flex items-start space-x-4">
                <div className="relative size-12 overflow-hidden rounded-full">
                  <Image
                    src={comment.profileImage}
                    alt={`${comment.author}'s profile`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-700">{comment.author}</h4>
                    <div className="relative" ref={modalRef}>
                      <button
                        className="flex size-6 flex-col items-center justify-center"
                        onClick={() =>
                          setOpenModalId(openModalId === comment.id ? null : comment.id)
                        }
                      >
                        <div className="flex flex-col gap-1">
                          <svg
                            width="3"
                            height="17"
                            viewBox="0 0 3 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="1.48" cy="1.55" r="1.55" fill="#A3A3A3" />
                            <circle cx="1.48" cy="8.5" r="1.55" fill="#A3A3A3" />
                            <circle cx="1.48" cy="15.45" r="1.55" fill="#A3A3A3" />
                          </svg>
                        </div>
                      </button>
                      {openModalId === comment.id && (
                        <CommentOptionsModal
                          onEdit={() => handleEditComment(comment.id)}
                          onDelete={() => handleDeleteComment(comment.id)}
                        />
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-gray-600">{comment.content}</p>
                  <span className="mt-2 block text-sm text-gray-400">{comment.date}</span>
                </div>
              </div>
            </div>
          ))}
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex space-x-4">
          <div className="relative size-12 overflow-hidden rounded-full">
            <Image
              src="https://picsum.photos/seed/currentuser/48/48"
              alt="Your profile"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="빙글빙글 돌아가는 짱구의 하루를 적어주세요."
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="hover:bg-gray-100 rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-700 transition duration-200"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogPostComments;
