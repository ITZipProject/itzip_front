import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { EditorNavigationProps } from '@/types/blog/common';

import ImageUploadButton from './ImageUploadButton';

const EditorNavigation: React.FC<EditorNavigationProps> = ({ onAction, onComplete }) => {
  const [isHeadingOpen, setIsHeadingOpen] = useState(false);

  const buttons = [
    { action: 'bold', icon: '/icons/blog/whiteMode_Bold.png', size: 16, value: '**텍스트**' },
    { action: 'italic', icon: '/icons/blog/whiteMode_Italic.png', size: 16, value: '*텍스트*' },
    {
      action: 'underline',
      icon: '/icons/blog/whiteMode_UnderLine.png',
      size: 20,
      value: '~~텍스트~~',
    },
    { action: 'quote', icon: '/icons/blog/whiteMode_Quote.png', size: 20, value: '> 인용문' },
    { action: 'code', icon: '/icons/blog/whiteMode_Code.png', size: 26, value: '```\n코드\n```' },
    {
      action: 'link',
      icon: '/icons/blog/whiteMode_Link.png',
      size: 26,
      value: '[링크 텍스트](https://example.com)',
    },
  ];

  const headings = [
    { label: 'H1', value: '# ' },
    { label: 'H2', value: '## ' },
    { label: 'H3', value: '### ' },
    { label: 'H4', value: '#### ' },
    { label: 'H5', value: '##### ' },
    { label: 'H6', value: '###### ' },
  ];

  const Divider = () => <div className="mx-4 h-7 w-px bg-gray" />;

  const handleImageUpload = (imageUrls: string[]) => {
    const markdownImages = imageUrls.map((url) => `![이미지 설명](${url})`).join('\n');
    onAction('image', markdownImages);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-white px-20 py-2.5">
      <Link href="/" className="text-base">
        <Image src="/logo.svg" alt="logo" width={80} height={40} className="h-auto max-w-[100px]" />
      </Link>
      <div className="flex items-center space-x-7">
        <div className="relative">
          <button
            onClick={() => setIsHeadingOpen(!isHeadingOpen)}
            className="bg-gray-200 hover:bg-gray-300 flex items-center space-x-2 rounded px-3 py-1 text-sm"
          >
            <span>제목</span>
            <Image
              src="/icons/blog/whiteMode_DownArrow.png"
              alt="Arrow"
              width={10}
              height={10}
              className={`transition-transform duration-300 ${isHeadingOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isHeadingOpen && (
            <div className="absolute left-0 z-50 mt-2 w-28 rounded-md border border-gray-200 bg-white shadow-lg">
              {headings.map((heading, index) => (
                <button
                  key={heading.label}
                  onClick={() => {
                    onAction('heading', heading.value);
                    setIsHeadingOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors duration-200 hover:bg-blue-100
                    ${index === 0 ? 'rounded-t-md' : ''}
                    ${index === headings.length - 1 ? 'rounded-b-md' : ''}`}
                >
                  {heading.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <Divider />
        {buttons.map((button, index) => (
          <React.Fragment key={button.action}>
            <button
              className="bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded px-0.5"
              onClick={() => onAction(button.action, button.value)}
            >
              <Image
                src={button.icon}
                alt={button.action}
                width={button.size}
                height={button.size}
              />
            </button>
            {index === 2 && <Divider />}
          </React.Fragment>
        ))}
        <ImageUploadButton onImageUpload={handleImageUpload} />
      </div>
      <button
        className="rounded-xl bg-[#4033ED] px-5 py-2 text-sm font-semibold text-white"
        onClick={onComplete}
      >
        완료
      </button>
    </nav>
  );
};

export default EditorNavigation;
