"use client";
import React, { useState, useRef, useEffect } from "react";
import CategorySelector from "@/components/blog/postwrite/CategorySelector";
import MarkdownEditor from "@/components/blog/postwrite/MarkdownEditor";
import MarkdownPreview from "@/components/blog/postwrite/MarkdownPreview";
import ToolbarButtons from "@/components/blog/postwrite/ToolbarButtons";

const BlogPostWritePage = () => {
	const [category, setCategory] = useState<string>("");
	const [markdownContent, setMarkdownContent] = useState<string>("");
	const editorRef = useRef<HTMLTextAreaElement>(null);
	const previewRef = useRef<HTMLDivElement>(null);

	const handleCategoryChange = (selectedCategory: string) => {
		setCategory(selectedCategory);
	};

	const handleContentChange = (content: string) => {
		setMarkdownContent(content);
	};

	const handleToolbarAction = (action: string, value?: string) => {
		const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
		if (!textarea) return;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const text = textarea.value;
		let newText = "";
		let insertedText = "";
		const selectedText = text.substring(start, end);

		switch (action) {
			case "heading":
				insertedText = `${value}${selectedText}`;
				newText = text.substring(0, start) + insertedText + text.substring(end);
				break;
			case "list":
				insertedText = selectedText
					.split("\n")
					.map((line) => `${value}${line}`)
					.join("\n");
				newText = text.substring(0, start) + insertedText + text.substring(end);
				break;
			case "hr":
				insertedText = `\n${value}\n`;
				newText = text.substring(0, start) + insertedText + text.substring(end);
				break;
			case "quote":
				insertedText = selectedText
					.split("\n")
					.map((line) => `> ${line}`)
					.join("\n");
				newText = text.substring(0, start) + insertedText + text.substring(end);
				break;
			case "code":
				insertedText = `\`\`\`\n${selectedText}\n\`\`\``;
				newText = text.substring(0, start) + insertedText + text.substring(end);
				break;
			default:
				insertedText = value ? value.replace(/텍스트|대체 텍스트/, selectedText || "텍스트") : "";
				newText = text.substring(0, start) + insertedText + text.substring(end);
		}

		setMarkdownContent(newText);
		textarea.focus();
		if (insertedText) {
			textarea.setSelectionRange(start + insertedText.length, start + insertedText.length);
		}
	};

	const handleSubmit = () => {
		//글 작성시 완료 로직
		console.log("Category:", category);
		console.log("Content:", markdownContent);
	};

	useEffect(() => {
		const handleEditorScroll = () => {
			if (editorRef.current && previewRef.current) {
				const editorScrollPercentage =
					editorRef.current.scrollTop / (editorRef.current.scrollHeight - editorRef.current.clientHeight);
				previewRef.current.scrollTop =
					editorScrollPercentage * (previewRef.current.scrollHeight - previewRef.current.clientHeight);
			}
		};

		const handlePreviewScroll = () => {
			if (editorRef.current && previewRef.current) {
				const previewScrollPercentage =
					previewRef.current.scrollTop / (previewRef.current.scrollHeight - previewRef.current.clientHeight);
				editorRef.current.scrollTop =
					previewScrollPercentage * (editorRef.current.scrollHeight - editorRef.current.clientHeight);
			}
		};

		editorRef.current?.addEventListener("scroll", handleEditorScroll);
		previewRef.current?.addEventListener("scroll", handlePreviewScroll);

		return () => {
			editorRef.current?.removeEventListener("scroll", handleEditorScroll);
			previewRef.current?.removeEventListener("scroll", handlePreviewScroll);
		};
	}, []);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">블로그 글 작성/수정</h1>
			<CategorySelector onCategoryChange={handleCategoryChange} />
			<div className="mb-4">
				<ToolbarButtons onAction={handleToolbarAction} />
			</div>
			<div className="flex space-x-4">
				<div className="w-1/2">
					<MarkdownEditor content={markdownContent} onContentChange={handleContentChange} ref={editorRef} />
				</div>
				<div className="w-1/2" ref={previewRef}>
					<MarkdownPreview content={markdownContent} />
				</div>
			</div>
			<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSubmit}>
				글 작성 완료
			</button>
		</div>
	);
};

export default BlogPostWritePage;
