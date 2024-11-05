import React, { forwardRef, useEffect, useRef } from 'react';

import { MarkdownEditorProps } from '@/types/blog/common';

const MarkdownEditor = forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  ({ content, title, onContentChange, onTitleChange }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [content]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onContentChange(e.target.value);
    };

    return (
      <div className="flex h-full flex-col">
        <div className="mb-6 mt-2 border-b border-color-disabled pb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="제목"
            className="w-full border-none bg-transparent text-4xl font-normal text-[#A5A5A5] outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <textarea
          ref={(el) => {
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
            textareaRef.current = el;
          }}
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력해주세요."
          className="grow resize-none border-none bg-transparent outline-none focus:outline-none focus:ring-0"
          style={{ overflow: 'hidden' }}
        />
      </div>
    );
  },
);

MarkdownEditor.displayName = 'MarkdownEditor';
export default MarkdownEditor;
