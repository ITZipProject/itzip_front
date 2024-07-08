// src\components\blog\postwrite\MarkdownPreview.tsx
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Components } from "react-markdown";

interface MarkdownPreviewProps {
	content: string;
}

const MarkdownPreview = React.forwardRef<HTMLDivElement, MarkdownPreviewProps>(({ content }, ref) => {
	const formattedContent = content.split("\n").join("  \n");
	const [processedContent, setProcessedContent] = useState(formattedContent);

	useEffect(() => {
		const lines = formattedContent.split("\n");
		const firstHeaderIndex = lines.findIndex((line) => /^#{1,6}\s/.test(line));
		if (firstHeaderIndex !== -1) {
			lines[firstHeaderIndex] = lines[firstHeaderIndex].replace(/^(#{1,6}\s)/, "$1<!-- first-header -->");
		}
		setProcessedContent(lines.join("\n"));
	}, [formattedContent]);

	const components: Partial<Components> = {
		code({ node, inline, className, children, ...props }: any) {
			const match = /language-(\w+)/.exec(className || "");
			return !inline && match ? (
				<SyntaxHighlighter style={vscDarkPlus as any} language={match[1]} PreTag="div" {...props}>
					{String(children).replace(/\n$/, "")}
				</SyntaxHighlighter>
			) : (
				<code className={className} {...props}>
					{children}
				</code>
			);
		},
		h1: ({ node, children, ...props }) => {
			const isFirstHeader = Array.isArray(children) && children[0] === "<!-- first-header -->";
			const className = `text-2xl font-bold my-4 ${isFirstHeader ? "" : "pt-10"}`;
			return (
				<h1 className={className} {...props}>
					{isFirstHeader && Array.isArray(children) ? children.slice(1) : children}
				</h1>
			);
		},
		h2: ({ node, children, ...props }) => {
			const isFirstHeader = Array.isArray(children) && children[0] === "<!-- first-header -->";
			const className = `text-xl font-bold my-3 ${isFirstHeader ? "" : "pt-6"}`;
			return (
				<h2 className={className} {...props}>
					{isFirstHeader && Array.isArray(children) ? children.slice(1) : children}
				</h2>
			);
		},
		h3: ({ node, children, ...props }) => {
			const isFirstHeader = Array.isArray(children) && children[0] === "<!-- first-header -->";
			const className = `text-lg font-bold my-2 ${isFirstHeader ? "" : "pt-4"}`;
			return (
				<h3 className={className} {...props}>
					{isFirstHeader && Array.isArray(children) ? children.slice(1) : children}
				</h3>
			);
		},

		ul: ({ children, className, ...props }) => (
			<ul className={`list-disc pl-4 my-2 ${className || ""}`} {...props}>
				{children}
			</ul>
		),
		ol: ({ children, className, ...props }) => (
			<ol className={`list-decimal pl-4 my-2 ${className || ""}`} {...props}>
				{children}
			</ol>
		),
		li: ({ children, ...props }) => {
			return (
				<li className="my-1" {...props}>
					{React.Children.map(children, (child) => {
						if (React.isValidElement(child) && (child.type === "ul" || child.type === "ol")) {
							return React.cloneElement(child, { ...child.props, className: "mt-2 ml-4" });
						}
						return child;
					})}
				</li>
			);
		},
		p: ({ children, ...props }) => {
			if (typeof children === "string") {
				return (
					<p className="my-1" {...props}>
						{children.split("\n").map((line, i) => (
							<React.Fragment key={i}>
								{line}
								{i !== children.split("\n").length - 1 && <br />}
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
		blockquote: ({ ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 my-2 italic" {...props} />,
	};
	return (
		<div
			ref={ref}
			className="w-full h-96 p-2 border rounded overflow-auto prose prose-sm max-w-none"
			id="preview-container"
		>
			<ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
				{processedContent}
			</ReactMarkdown>
		</div>
	);
});

MarkdownPreview.displayName = "MarkdownPreview";
export default MarkdownPreview;
