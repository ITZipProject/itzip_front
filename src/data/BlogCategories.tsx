export type CategoryType = {
  [key: string]: string[];
};

export const blogCategories: CategoryType = {
  '소프트웨어 개발': ['프로그래밍 언어', '웹 개발', '모바일 개발', '게임 개발'],
  '시스템 & 인프라': ['DevOps', '데이터베이스', '클라우드', '보안 & 네트워크'],
  테크: ['인공지능', '데이터 사이언스', '블록체인', 'VR/AR', '하드웨어'],
  '디자인 & 아트': ['UI/UX', '그래픽스', '3D 모델링', '사운드'],
  비즈니스: ['오피스', '기획 & PM', '자동화', '마케팅'],
  기타: ['기타'],
};

export const getAllSubcategories = (): string[] => {
  return Object.values(blogCategories).flat();
};
