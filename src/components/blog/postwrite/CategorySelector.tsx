import React, { useState } from "react";

type CategoryType = {
	[key: string]: string[];
};

const categories: CategoryType = {
	"소프트웨어 개발": ["프로그래밍 언어", "웹 개발", "모바일 개발", "게임 개발"],
	"시스템 & 인프라": ["DevOps", "데이터베이스", "클라우드", "보안 & 네트워크"],
	테크: ["인공지능", "데이터 사이언스", "블록체인", "VR/AR", "하드웨어"],
	"디자인 & 아트": ["UI/UX", "그래픽스", "3D 모델링", "사운드"],
	비즈니스: ["오피스", "기획 & PM", "자동화", "마케팅"],
	기타: ["기타"],
};


interface CategorySelectorProps {
	onCategoryChange: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategoryChange }) => {
	const [mainCategory, setMainCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");

	const handleMainCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setMainCategory(e.target.value);
		setSubCategory("");
	};

	const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSubCategory(e.target.value);
		onCategoryChange(`${mainCategory} > ${e.target.value}`);
	};

	return (
		<div className="mb-4">
			<select className="mr-2 p-2 border rounded" value={mainCategory} onChange={handleMainCategoryChange}>
				<option value="">상위 카테고리 선택</option>
				{Object.keys(categories).map((cat) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select>
			{mainCategory && (
				<select className="p-2 border rounded" value={subCategory} onChange={handleSubCategoryChange}>
					<option value="">하위 카테고리 선택</option>
					{categories[mainCategory].map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			)}
		</div>
	);
};

export default CategorySelector;
