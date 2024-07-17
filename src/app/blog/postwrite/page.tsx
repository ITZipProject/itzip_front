"use client";
import React, { useState, useRef, useEffect } from "react";
import CategorySelector from "@/components/blog/postwrite/CategorySelector";
import MarkdownEditor from "@/components/blog/postwrite/MarkdownEditor";
import MarkdownPreview from "@/components/blog/postwrite/MarkdownPreview";
import ToolbarButtons from "@/components/blog/postwrite/ToolbarButtons";

// 카테고리 ID 매핑
const categoryIdMap: { [key: string]: number } = {
	"소프트웨어 개발": 1,
	"시스템 & 인프라": 2,
	테크: 3,
	"디자인 & 아트": 4,
	비즈니스: 5,
	기타: 6,
};

// 카테고리 ID를 가져오는 함수
function getCategoryId(category: string): number {
	const [mainCategory] = category.split(" > ");
	return categoryIdMap[mainCategory] || 0;
}

const BlogPostWritePage = () => {
	const [category, setCategory] = useState<string>("");
	const [markdownContent, setMarkdownContent] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const editorRef = useRef<HTMLTextAreaElement>(null);
	const previewRef = useRef<HTMLDivElement>(null);
	const [isEditorScrolling, setIsEditorScrolling] = useState(false);
	const [isPreviewScrolling, setIsPreviewScrolling] = useState(false);
	const lastEditorScrollTop = useRef(0);
	const lastPreviewScrollTop = useRef(0);
	const [isSyncEnabled, setIsSyncEnabled] = useState(false);
	const scrollThreshold = 5; // 스크롤 변화 감지를 위한 최소 픽셀 수

	const handleCategoryChange = (selectedCategory: string) => {
		setCategory(selectedCategory);
	};

	const handleContentChange = (content: string) => {
		setMarkdownContent(content);
	};

	const handleTitleChange = (newTitle: string) => {
		setTitle(newTitle);
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

	const handleSubmit = async () => {
		const blogId = Math.floor(Math.random() * 1000000);
		const categoryId = getCategoryId(category);

		const articleData = {
			categoryId,
			blogId,
			title,
			content: markdownContent,
		};

		console.log("Sending article data:", articleData);

		try {
			const response = await fetch("/api/blog/posts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(articleData),
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Server response:", result);
				// 성공 처리 (예: 알림 표시, 페이지 이동 등)
			} else {
				const errorText = await response.text();
				console.error("Failed to create article:", errorText);
				// 오류 처리 (예: 오류 메시지 표시)
			}
		} catch (error) {
			console.error("Network error:", error);
			// 네트워크 오류 처리
		}
	};

	useEffect(() => {
		if (!isSyncEnabled) return;

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
							editorScrollPercentage * (previewRef.current.scrollHeight - previewRef.current.clientHeight);
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
							currentScrollTop / (previewRef.current.scrollHeight - previewRef.current.clientHeight);
						editorRef.current.scrollTop =
							previewScrollPercentage * (editorRef.current.scrollHeight - editorRef.current.clientHeight);
						lastPreviewScrollTop.current = currentScrollTop;
						setTimeout(() => setIsPreviewScrolling(false), 50);
					}
				}
			});
		};

		editorRef.current?.addEventListener("scroll", handleEditorScroll);
		previewRef.current?.addEventListener("scroll", handlePreviewScroll);

		return () => {
			editorRef.current?.removeEventListener("scroll", handleEditorScroll);
			previewRef.current?.removeEventListener("scroll", handlePreviewScroll);
			if (editorScrollTimer) cancelAnimationFrame(editorScrollTimer);
			if (previewScrollTimer) cancelAnimationFrame(previewScrollTimer);
		};
	}, [isEditorScrolling, isPreviewScrolling, isSyncEnabled]);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">블로그 글 작성/수정</h1>
			<CategorySelector onCategoryChange={handleCategoryChange} />
			<input
				type="text"
				className="w-full p-2 text-3xl font-bold border-b mb-4"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="제목을 입력하세요..."
			/>
			<div className="mb-4">
				<ToolbarButtons onAction={handleToolbarAction} />
			</div>
			<div className="flex space-x-4">
				<div className="w-1/2">
					<MarkdownEditor content={markdownContent} onContentChange={handleContentChange} ref={editorRef} />
				</div>
				<div className="w-1/2">
					<MarkdownPreview content={markdownContent} ref={previewRef} />
				</div>
			</div>
			<div className="mt-4 flex justify-between items-center">
				<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSubmit}>
					글 작성 완료
				</button>
				<div className="flex items-center">
					<label className="inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-150 ease-in-out"
							checked={isSyncEnabled}
							onChange={(e) => setIsSyncEnabled(e.target.checked)}
						/>
						<span className="ml-2 text-sm text-gray-700">스크롤 동기화</span>
					</label>
					<span className="ml-1 px-1.5 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">Beta</span>
				</div>
			</div>
		</div>
	);
};

export default BlogPostWritePage;
