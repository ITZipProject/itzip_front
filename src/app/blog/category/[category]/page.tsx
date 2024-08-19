import React from 'react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  return (
    <div className="space-y-8 p-4">
      <h1 className="mb-8">카테고리: {params.category}</h1>

      <section>
        <h2 className="mb-4">Display 스타일</h2>
        <p className="font-pre-display-01">Display 01: 큰 제목 텍스트</p>
        <p className="font-pre-display-02">Display 02: 중간 크기 제목</p>
        <p className="font-pre-display-03">Display 03: 작은 제목</p>
      </section>

      <section>
        <h2 className="mb-4">Heading 스타일</h2>
        <h1 className="font-pre-heading-01">Heading 01: 주요 섹션 제목</h1>
        <h2 className="font-pre-heading-02">Heading 02: 부 섹션 제목</h2>
        <h3 className="font-pre-heading-03">Heading 03: 소 섹션 제목</h3>
      </section>

      <section>
        <h2 className="mb-4">Body 스타일</h2>
        <p className="font-pre-body-01">
          Body 01: 강조된 본문 텍스트입니다. 중요한 정보를 표시할 때 사용합니다.
        </p>
        <p className="font-pre-body-02">
          Body 02: 일반적인 본문 텍스트입니다. 대부분의 컨텐츠에 이 스타일을 사용합니다.
        </p>
        <p className="font-pre-body-03">
          Body 03: 작은 크기의 강조 텍스트입니다. 부가 정보나 짧은 설명에 사용합니다.
        </p>
        <p className="font-pre-body-04">
          Body 04: 가장 작은 본문 텍스트입니다. 각주나 부가 설명에 적합합니다.
        </p>
      </section>

      <section>
        <h2 className="mb-4">Caption 스타일</h2>
        <p className="font-pre-caption-01">
          Caption 01: 강조된 작은 텍스트입니다. 라벨이나 짧은 설명에 사용합니다.
        </p>
        <p className="font-pre-caption-02">
          Caption 02: 일반적인 작은 텍스트입니다. 부가 정보나 메타데이터에 적합합니다.
        </p>
        <p className="font-pre-caption-03">
          Caption 03: 매우 작은 강조 텍스트입니다. 작은 라벨이나 아이콘 설명에 사용합니다.
        </p>
        <p className="font-pre-caption-04">
          Caption 04: 가장 작은 일반 텍스트입니다. 법적 고지나 매우 작은 정보에 사용합니다.
        </p>
      </section>
      <section>
        <h2 className="mb-4">그림자 스타일</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded bg-white p-4 shadow-card">
            <p>Card 그림자</p>
          </div>
          <div className="rounded bg-white p-4 shadow-modal">
            <p>Modal 그림자</p>
          </div>
          <div className="rounded-full bg-white p-4 shadow-fab">
            <p>FAB 그림자</p>
          </div>
          <div className="bg-white p-4 shadow-nav">
            <p>Nav 그림자</p>
          </div>
          <div className="bg-white p-4 shadow-bottomsheet">
            <p>Bottom Sheet 그림자</p>
          </div>
          <div className="bg-white p-4 shadow-drawer">
            <p>Drawer 그림자</p>
          </div>
          <div className="rounded bg-white p-4 shadow-dropdown">
            <p>Dropdown 그림자</p>
          </div>
          <div className="rounded bg-white p-4 shadow-toast">
            <p>Toast 그림자</p>
          </div>
          <div className="rounded bg-white p-4 shadow-tooltip">
            <p>Tooltip 그림자</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4">테두리 너비 스타일</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 border-01">border-01 (0.5px)</div>
          <div className="p-4 border-02">border-02 (1px)</div>
          <div className="p-4 border-03">border-03 (1.5px)</div>
          <div className="p-4 border-04">border-04 (2px)</div>
          <div className="p-4 border-05">border-05 (3px)</div>
          <div className="p-4 border-06">border-06 (4px)</div>
          <div className="p-4 border-07">border-07 (8px)</div>
          <div className="p-4 border-08">border-08 (12px)</div>
        </div>
      </section>

      <section>
        <h2 className="mb-4">코너 반경 스타일</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 border-08 radius-01">radius-01 (8px)</div>
          <div className="p-4 border-07 radius-02">radius-02 (10px)</div>
          <div className="p-4 border-06 radius-03">radius-03 (12px)</div>
          <div className="p-4 border-05 radius-04">radius-04 (16px)</div>
          <div className="p-4 border-04 radius-05">radius-05 (20px)</div>
          <div className="p-4 border-03 radius-06">radius-06 (24px)</div>
          <div className="p-4 border-02 radius-07">radius-07 (40px)</div>
          <div className="p-4 border-01 radius-08">radius-08 (9999px)</div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
