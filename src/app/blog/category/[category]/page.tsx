import React from 'react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  return (
    <div>
      <h1>카테고리: {params.category}</h1>
      {/* 카테고리별 포스트 목록 */}
    </div>
  );
};

export default CategoryPage;
