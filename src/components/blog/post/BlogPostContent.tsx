import Image from 'next/image';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent: FC<BlogPostContentProps> = ({ content }) => {
  const components: Partial<Components> = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...(props as Record<string, unknown>)}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    img: (image) => (
      <Image
        src={image.src || ''}
        alt={image.alt || ''}
        width={519}
        height={519}
        className="my-4 rounded"
      />
    ),
    p: ({ children }) => <p className="my-2 text-lg leading-7">{children}</p>,
    h1: ({ children }) => <h1 className="my-4 text-4xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="my-3 text-3xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="my-2 text-2xl font-bold">{children}</h3>,
    ul: ({ children }) => <ul className="my-2 list-disc pl-5">{children}</ul>,
    ol: ({ children }) => <ol className="my-2 list-decimal pl-5">{children}</ol>,
    blockquote: ({ children }) => (
      <blockquote className="my-2 border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>
    ),
  };

  return (
    <div className="prose prose-lg mx-auto max-w-4xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogPostContent;
