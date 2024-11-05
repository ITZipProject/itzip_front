import React from 'react';

import { OptionsModalProps } from '@/types/blog/common';

const PostOptionsModal: React.FC<OptionsModalProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-md bg-white shadow-lg">
      <button
        onClick={onEdit}
        className="block w-full px-4 py-2 text-left text-sm transition-colors duration-200 hover:bg-blue-100"
      >
        수정
      </button>
      <button
        onClick={onDelete}
        className="block w-full px-4 py-2 text-left text-sm text-red-600 transition-colors duration-200 hover:bg-blue-100"
      >
        삭제
      </button>
    </div>
  );
};

export default PostOptionsModal;
