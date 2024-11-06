import Image from 'next/image';
import React, { useState, useRef } from 'react';

import { CategoryType, blogCategories } from '@/data/BlogCategories';
import { PublishModalProps } from '@/types/blog/common';

const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, onPublish }) => {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePublish = async () => {
    if (!mainCategory || !subCategory) {
      alert('상위 카테고리와 하위 카테고리를 모두 선택해주세요.');
      return;
    }
    const categoryId = getCategoryId(`${mainCategory} > ${subCategory}`);
    setIsPublishing(true);
    try {
      await onPublish(categoryId, thumbnailUrl);
      alert('게시글이 성공적으로 등록되었습니다.');
      onClose();
    } catch (error) {
      console.error('Failed to publish:', error);
      alert('게시에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsPublishing(false);
    }
  };

  const getCategoryId = (category: string): number => {
    const [mainCat] = category.split(' > ');
    const categoryIdMap: { [key: string]: number } = {
      '소프트웨어 개발': 1,
      '시스템 & 인프라': 2,
      테크: 3,
      '디자인 & 아트': 4,
      비즈니스: 5,
      기타: 6,
    };
    return categoryIdMap[mainCat] || 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setThumbnailUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6">
          <label className="text-md mb-3 block font-semibold">카테고리</label>
          <div className="flex items-center space-x-4">
            <select
              className="w-1/2 rounded border p-2"
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
            >
              <option value="">상위 카테고리</option>
              {Object.keys(blogCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {mainCategory && (
              <select
                className="w-1/2 rounded border p-2"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">하위 카테고리</option>
                {blogCategories[mainCategory as keyof CategoryType].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label className="text-md mb-2 block font-semibold">게시글 섬네일</label>
          <div
            className="relative w-full cursor-pointer overflow-hidden rounded-xl border border-gray-300"
            style={{ paddingTop: '56.25%' }} // 16:9 비율 유지
            onClick={() => fileInputRef.current?.click()}
          >
            {thumbnailUrl ? (
              <Image src={thumbnailUrl} alt="Thumbnail" layout="fill" objectFit="cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="mt-2 flex space-x-2">
            <button
              className="rounded-xl border border-gray-300 px-4 py-1 text-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              섬네일 등록
            </button>
            {thumbnailUrl && (
              <button
                className="rounded-xl border border-gray-300 px-4 py-1 text-sm text-red-500"
                onClick={handleImageDelete}
              >
                삭제
              </button>
            )}
          </div>
        </div>
        <div className="mb-6 border-t border-gray-200"></div>
        <div className="flex justify-end space-x-2">
          <button
            className="hover:bg-gray-100 rounded-xl border border-gray-300 px-4 py-2 text-gray-500"
            onClick={onClose}
            disabled={isPublishing}
          >
            취소
          </button>
          <button
            className="rounded-xl border border-blue-500 bg-white px-4 py-2 text-blue-500 hover:bg-blue-50 disabled:opacity-50"
            onClick={() => {
              void handlePublish();
            }}
            disabled={isPublishing}
          >
            {isPublishing ? '등록 중...' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
