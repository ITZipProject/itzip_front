export interface CategoryMapping {
  id: string;
  mainCategory: string;
  subCategory: string;
  displayName: string;
}

export const categoryMappings: CategoryMapping[] = [
  // 소프트웨어 개발
  {
    id: '66ce188c0000000000a385cf',
    mainCategory: '소프트웨어 개발',
    subCategory: '프로그래밍 언어',
    displayName: '프로그래밍 언어',
  },
  {
    id: '66ce188c0000000000a385d0',
    mainCategory: '소프트웨어 개발',
    subCategory: '웹 개발',
    displayName: '웹 개발',
  },
  {
    id: '66ce188c0000000000a385d1',
    mainCategory: '소프트웨어 개발',
    subCategory: '모바일 개발',
    displayName: '모바일 개발',
  },
  {
    id: '66ce188c0000000000a385d2',
    mainCategory: '소프트웨어 개발',
    subCategory: '게임 개발',
    displayName: '게임 개발',
  },

  // 시스템 & 인프라
  {
    id: '66ce188c0000000000a385d3',
    mainCategory: '시스템 & 인프라',
    subCategory: 'DevOps',
    displayName: 'DevOps',
  },
  {
    id: '66ce188c0000000000a385d4',
    mainCategory: '시스템 & 인프라',
    subCategory: '데이터베이스',
    displayName: '데이터베이스',
  },
  {
    id: '66ce188c0000000000a385d5',
    mainCategory: '시스템 & 인프라',
    subCategory: '클라우드',
    displayName: '클라우드',
  },
  {
    id: '66ce188c0000000000a385d6',
    mainCategory: '시스템 & 인프라',
    subCategory: '보안 & 네트워크',
    displayName: '보안 & 네트워크',
  },

  // 테크
  {
    id: '66ce188c0000000000a385d7',
    mainCategory: '테크',
    subCategory: '인공지능',
    displayName: '인공지능',
  },
  {
    id: '66ce188c0000000000a385d8',
    mainCategory: '테크',
    subCategory: '데이터 사이언스',
    displayName: '데이터 사이언스',
  },
  {
    id: '66ce188c0000000000a385d9',
    mainCategory: '테크',
    subCategory: '블록체인',
    displayName: '블록체인',
  },
  {
    id: '66ce188c0000000000a385da',
    mainCategory: '테크',
    subCategory: 'VR/AR',
    displayName: 'VR/AR',
  },
  {
    id: '66ce188c0000000000a385db',
    mainCategory: '테크',
    subCategory: '하드웨어',
    displayName: '하드웨어',
  },

  // 디자인 & 아트
  {
    id: '66ce188c0000000000a385dc',
    mainCategory: '디자인 & 아트',
    subCategory: 'UI/UX',
    displayName: 'UI/UX',
  },
  {
    id: '66ce188c0000000000a385dd',
    mainCategory: '디자인 & 아트',
    subCategory: '그래픽스',
    displayName: '그래픽스',
  },
  {
    id: '66ce188c0000000000a385de',
    mainCategory: '디자인 & 아트',
    subCategory: '3D 모델링',
    displayName: '3D 모델링',
  },
  {
    id: '66ce188c0000000000a385df',
    mainCategory: '디자인 & 아트',
    subCategory: '사운드',
    displayName: '사운드',
  },

  // 비즈니스
  {
    id: '66ce188c0000000000a385e0',
    mainCategory: '비즈니스',
    subCategory: '오피스',
    displayName: '오피스',
  },
  {
    id: '66ce188c0000000000a385e1',
    mainCategory: '비즈니스',
    subCategory: '기획 & PM',
    displayName: '기획 & PM',
  },
  {
    id: '66ce188c0000000000a385e2',
    mainCategory: '비즈니스',
    subCategory: '자동화',
    displayName: '자동화',
  },
  {
    id: '66ce188c0000000000a385e3',
    mainCategory: '비즈니스',
    subCategory: '마케팅',
    displayName: '마케팅',
  },

  // 기타
  {
    id: '66ce18d84cb7d0b29ce602f5',
    mainCategory: '기타',
    subCategory: '기타',
    displayName: '기타',
  },
];

// 카테고리 ID로 카테고리 정보를 찾는 함수
export const getCategoryById = (categoryId: string): CategoryMapping | undefined => {
  return categoryMappings.find((mapping) => mapping.id === categoryId);
};
