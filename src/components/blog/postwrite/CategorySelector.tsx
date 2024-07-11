import React, { useState } from "react";

type CategoryType = {
	[key: string]: {
		[key: string]: string[];
	};
};

const categories: CategoryType = {
	"웹 개발": {
		"프로그래밍 언어와 기술": ["Java", "Python", "JavaScript", "C/C++", "Ruby", "Swift", "Kotlin"],
		"HTML/CSS": [],
		"프론트엔드 개발": ["React", "Angular", "Vue.js"],
		"백엔드 개발": ["Node.js", "Django", "Flask"],
		"웹 호스팅 및 서버 관리": [],
		"웹 개발 툴과 에디터 소개": [],
	},
	"모바일 앱 개발": {
		"iOS 개발": ["Swift", "Objective-C"],
		"안드로이드 개발": ["Kotlin", "Java"],
		"크로스 플랫폼 개발": ["Flutter", "React Native"],
	},
};

interface CategorySelectorProps {
	onCategoryChange: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategoryChange }) => {
	const [mainCategory, setMainCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [leafCategory, setLeafCategory] = useState("");

	const handleMainCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setMainCategory(e.target.value);
		setSubCategory("");
		setLeafCategory("");
	};

	const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSubCategory(e.target.value);
		setLeafCategory("");
	};

	const handleLeafCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLeafCategory(e.target.value);
		onCategoryChange(`${mainCategory} > ${subCategory} > ${e.target.value}`);
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
				<select className="mr-2 p-2 border rounded" value={subCategory} onChange={handleSubCategoryChange}>
					<option value="">중위 카테고리 선택</option>
					{Object.keys(categories[mainCategory]).map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			)}

			{subCategory && categories[mainCategory][subCategory].length > 0 && (
				<select className="p-2 border rounded" value={leafCategory} onChange={handleLeafCategoryChange}>
					<option value="">하위 카테고리 선택</option>
					{categories[mainCategory][subCategory].map((cat) => (
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
