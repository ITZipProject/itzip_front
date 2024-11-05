import React, { useState } from 'react';

import { blogCategories } from '@/data/BlogCategories';

interface CategorySelectorProps {
  onCategoryChange: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategoryChange }) => {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const handleMainCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMainCategory(e.target.value);
    setSubCategory('');
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubCategory(e.target.value);
    onCategoryChange(`${mainCategory} > ${e.target.value}`);
  };

  return (
    <div className="mb-4">
      <select
        className="mr-2 rounded border p-2"
        value={mainCategory}
        onChange={handleMainCategoryChange}
      >
        <option value="">상위 카테고리 선택</option>
        {Object.keys(blogCategories).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {mainCategory && (
        <select
          className="rounded border p-2"
          value={subCategory}
          onChange={handleSubCategoryChange}
        >
          <option value="">하위 카테고리 선택</option>
          {blogCategories[mainCategory].map((cat) => (
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
