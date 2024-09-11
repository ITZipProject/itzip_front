'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  profileImage: string;
}

interface BlogPostCommentsProps {
  initialComments: Comment[];
}

const BlogPostComments: React.FC<BlogPostCommentsProps> = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: 'Current User',
        content: newComment,
        date: new Date().toLocaleString(),
        profileImage: `https://picsum.photos/seed/user${comments.length + 1}/48/48`,
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-lg font-medium">댓글 {comments.length}</h3>
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
                <button className="text-gray-400">
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
                </button>
              </div>
              <p className="mt-1 text-gray-600">{comment.content}</p>
              <span className="mt-2 block text-sm text-gray-400">{comment.date}</span>
            </div>
          </div>
        </div>
      ))}
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
