import React, {
  useEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
  forwardRef,
} from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview = forwardRef<HTMLDivElement, MarkdownPreviewProps>(({ content }, ref) => {
  const formattedContent = content.split('\n').join('  \n');
  const [processedContent, setProcessedContent] = useState(formattedContent);

  useEffect(() => {
    const lines = formattedContent.split('\n');
    const firstHeaderIndex = lines.findIndex((line) => /^#{1,6}\s/.test(line));
    if (firstHeaderIndex !== -1) {
      lines[firstHeaderIndex] = lines[firstHeaderIndex].replace(
        /^(#{1,6}\s)/,
        '$1<!-- first-header -->',
      );
    }
    setProcessedContent(lines.join('\n'));
  }, [formattedContent]);

  const components: Partial<Components> = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...(props as any)}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children, ...props }) => {
      const isFirstHeader = Array.isArray(children) && children[0] === '<!-- first-header -->';
      const className = `text-4xl font-bold my-2 ${isFirstHeader ? '' : 'pt-12'}`;
      return (
        <h1 className={className} {...props}>
          {isFirstHeader && Array.isArray(children) ? children.slice(1) : children}
        </h1>
      );
    },
    h2: ({ children, ...props }) => {
      const isFirstHeader = Array.isArray(children) && children[0] === '<!-- first-header -->';
      const className = `text-3xl font-bold my-2 ${isFirstHeader ? '' : 'pt-9'}`;
      return (
        <h2 className={className} {...props}>
          {isFirstHeader && Array.isArray(children) ? children.slice(1) : children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const isFirstHeader = Array.isArray(children) && children[0] === '<!-- first-header -->';
      const className = `text-2xl font-bold my-2 ${isFirstHeader ? '' : 'pt-6'}`;
      return (
        <h3 className={className} {...props}>
          {isFirstHeader && Array.isArray(children) ? children.slice(1) : children}
        </h3>
      );
    },
    h4: ({ children, ...props }) => {
      const isFirstHeader = Array.isArray(children) && children[0] === '<!-- first-header -->';
      const className = `text-xl font-bold my-2 ${isFirstHeader ? '' : 'pt-4'}`;
      return (
        <h3 className={className} {...props}>
          {isFirstHeader && Array.isArray(children) ? children.slice(1) : children}
        </h3>
      );
    },
    h5: ({ children, ...props }) => {
      const isFirstHeader = Array.isArray(children) && children[0] === '<!-- first-header -->';
      const className = `text-lg font-bold my-2 ${isFirstHeader ? '' : 'pt-2'}`;
      return (
        <h3 className={className} {...props}>
          {isFirstHeader && Array.isArray(children) ? children.slice(1) : children}
        </h3>
      );
    },
    h6: ({ children, ...props }) => {
      const isFirstHeader = Array.isArray(children) && children[0] === '<!-- first-header -->';
      const className = `font-bold my-2 ${isFirstHeader ? '' : 'pt-1'}`;
      return (
        <h3 className={className} {...props}>
          {isFirstHeader && Array.isArray(children) ? children.slice(1) : children}
        </h3>
      );
    },
    ul: ({ children, className, ...props }) => (
      <ul className={`my-2 list-disc pl-4 ${className || ''}`} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }) => (
      <ol className={`my-2 pl-8 ${className || ''} list-decimal`} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => {
      return (
        <li className="my-1 pl-1" {...props}>
          {Children.map(children, (child) => {
            if (
              isValidElement<React.HTMLAttributes<HTMLElement>>(child) &&
              (child.type === 'ul' || child.type === 'ol')
            ) {
              return cloneElement(child, {
                ...child.props,
                className: `${child.props.className || ''} mt-2 ml-4`.trim(),
              } as React.HTMLAttributes<HTMLElement>);
            }
            return child;
          })}
        </li>
      );
    },
    p: ({ children, ...props }) => {
      if (typeof children === 'string') {
        return (
          <p className="my-1" {...props}>
            {children.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i !== children.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      }
      return (
        <p className="my-1" {...props}>
          {children}
        </p>
      );
    },
    blockquote: ({ ...props }) => (
      <blockquote className="my-2 border-l-4 border-gray-300 pl-4 italic" {...props} />
    ),
  };

  return (
    <div
      ref={ref}
      className="prose prose-sm h-96 w-full max-w-none overflow-auto rounded border bg-white p-2 pb-24"
      id="preview-container"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {processedContent}
      </ReactMarkdown>
    </div>
  );
});

MarkdownPreview.displayName = 'MarkdownPreview';
export default MarkdownPreview;
