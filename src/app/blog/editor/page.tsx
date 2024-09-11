'use client';
import React, { useState, useRef, useEffect } from 'react';

import EditorNavigation from '@/components/blog/editor/EditorNavigation';
import MarkdownEditor from '@/components/blog/editor/MarkdownEditor';
import MarkdownPreview from '@/components/blog/editor/MarkdownPreview';
import PublishModal from '@/components/blog/editor/PublishModal';

const BlogEditorPage = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isEditorScrolling, setIsEditorScrolling] = useState(false);
  const [isPreviewScrolling, setIsPreviewScrolling] = useState(false);
  const lastEditorScrollTop = useRef(0);
  const lastPreviewScrollTop = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollThreshold = 5;

  const handleContentChange = (content: string) => {
    setMarkdownContent(content);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleToolbarAction = (action: string, value?: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    let newText = '';
    let insertedText = '';
    const selectedText = text.substring(start, end);

    switch (action) {
      case 'heading':
        insertedText = `${value}${selectedText}`;
        newText = text.substring(0, start) + insertedText + text.substring(end);
        break;
      case 'list':
        insertedText = selectedText
          .split('\n')
          .map((line) => `${value}${line}`)
          .join('\n');
        newText = text.substring(0, start) + insertedText + text.substring(end);
        break;
      case 'hr':
        insertedText = `\n${value}\n`;
        newText = text.substring(0, start) + insertedText + text.substring(end);
        break;
      case 'quote':
        insertedText = selectedText
          .split('\n')
          .map((line) => `> ${line}`)
          .join('\n');
        newText = text.substring(0, start) + insertedText + text.substring(end);
        break;
      case 'code':
        insertedText = `\`\`\`\n${selectedText}\n\`\`\``;
        newText = text.substring(0, start) + insertedText + text.substring(end);
        break;
      default:
        insertedText = value ? value.replace(/텍스트|대체 텍스트/, selectedText || '텍스트') : '';
        newText = text.substring(0, start) + insertedText + text.substring(end);
    }

    setMarkdownContent(newText);
    textarea.focus();
    if (insertedText) {
      textarea.setSelectionRange(start + insertedText.length, start + insertedText.length);
    }
  };

  useEffect(() => {
    const editor = editorRef.current;
    const preview = previewRef.current;
    let editorScrollTimer: number | null = null;
    let previewScrollTimer: number | null = null;

    const handleEditorScroll = () => {
      if (isPreviewScrolling) return;
      if (editorScrollTimer) cancelAnimationFrame(editorScrollTimer);

      editorScrollTimer = requestAnimationFrame(() => {
        if (editorRef.current && previewRef.current) {
          const currentScrollTop = editorRef.current.scrollTop;
          if (Math.abs(currentScrollTop - lastEditorScrollTop.current) > scrollThreshold) {
            setIsEditorScrolling(true);
            const editorScrollPercentage =
              currentScrollTop / (editorRef.current.scrollHeight - editorRef.current.clientHeight);
            previewRef.current.scrollTop =
              editorScrollPercentage *
              (previewRef.current.scrollHeight - previewRef.current.clientHeight);
            lastEditorScrollTop.current = currentScrollTop;
            setTimeout(() => setIsEditorScrolling(false), 50);
          }
        }
      });
    };

    const handlePreviewScroll = () => {
      if (isEditorScrolling) return;
      if (previewScrollTimer) cancelAnimationFrame(previewScrollTimer);
      previewScrollTimer = requestAnimationFrame(() => {
        if (editorRef.current && previewRef.current) {
          const currentScrollTop = previewRef.current.scrollTop;
          if (Math.abs(currentScrollTop - lastPreviewScrollTop.current) > scrollThreshold) {
            setIsPreviewScrolling(true);
            const previewScrollPercentage =
              currentScrollTop /
              (previewRef.current.scrollHeight - previewRef.current.clientHeight);
            editorRef.current.scrollTop =
              previewScrollPercentage *
              (editorRef.current.scrollHeight - editorRef.current.clientHeight);
            lastPreviewScrollTop.current = currentScrollTop;
            setTimeout(() => setIsPreviewScrolling(false), 50);
          }
        }
      });
    };

    editor?.addEventListener('scroll', handleEditorScroll);
    preview?.addEventListener('scroll', handlePreviewScroll);

    return () => {
      editor?.removeEventListener('scroll', handleEditorScroll);
      preview?.removeEventListener('scroll', handlePreviewScroll);
      if (editorScrollTimer) cancelAnimationFrame(editorScrollTimer);
      if (previewScrollTimer) cancelAnimationFrame(previewScrollTimer);
    };
  }, [isEditorScrolling, isPreviewScrolling]);

  const handlePublish = async (categoryId: number, thumbnailUrl: string) => {
    const articleData = {
      categoryId,
      title,
      content: markdownContent,
      thumbnailUrl,
    };

    console.log('Sending article data:', articleData);
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        const result = (await response.json()) as { message: string };
        console.log('Server response:', result);
        alert('글이 성공적으로 작성되었습니다.');
        setIsModalOpen(false);
      } else {
        const errorText = await response.text();
        console.error('Failed to create article:', errorText);
        alert('글 작성에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <EditorNavigation onAction={handleToolbarAction} onComplete={() => setIsModalOpen(true)} />

      <div className="flex gap-20 px-20 py-4">
        <div className="flex flex-1 flex-col gap-8">
          <MarkdownEditor
            content={markdownContent}
            title={title}
            onContentChange={handleContentChange}
            onTitleChange={handleTitleChange}
            ref={editorRef}
          />
        </div>

        <div className="w-px bg-[#E8E8E8]"></div>

        <div className="flex-1">
          <MarkdownPreview content={markdownContent} title={title} ref={previewRef} />
        </div>
      </div>
      <PublishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPublish={async (categoryId, thumbnailUrl) => {
          await handlePublish(categoryId, thumbnailUrl);
        }}
      />
    </div>
  );
};

export default BlogEditorPage;
