import React, { forwardRef } from "react";

interface MarkdownEditorProps {
	content: string;
	onContentChange: (content: string) => void;
}

const MarkdownEditor = forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(({ content, onContentChange }, ref) => {
	return (
		<div className="relative">
			<textarea
				ref={ref}
				className="w-full h-96 p-2 border rounded pb-24"
				value={content}
				onChange={(e) => onContentChange(e.target.value)}
				placeholder="Markdown 문법으로 글을 작성하세요..."
			/>
		</div>
	);
});

MarkdownEditor.displayName = "MarkdownEditor";
export default MarkdownEditor;
