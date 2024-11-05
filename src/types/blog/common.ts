import { CategoryType } from '@/data/BlogCategories';

// blog/main
/** 캐러셀 관련 타입 */
export interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  category: keyof CategoryType;
  subCategory: string;
  link: string;
}

/** 블로그 포스트 관련 타입 */
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  likes: number;
  saves: number;
  author: string;
  timeAgo: string;
  imageUrl: string;
  profileImageUrl: string;
}

/** 컨트롤 관련 타입 */
export interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  iconSrc: string;
  textSize?: string;
  textWeight?: string;
  iconSize?: number;
}

/** 페이지네이션 관련 타입 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** 카운터 관련 타입 */
export interface CounterProps {
  endValue: number;
  duration?: number;
}

/** 캐러셀 인디케이터 관련 타입 */
export interface CarouselIndicatorProps {
  totalItems: number;
  currentIndex: number;
  onIndicatorClick: (index: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

/** 블로그 포스트 카드 관련 타입 */
export type BlogPostCardProps = BlogPost;

// blog/user
/** 사용자 블로그 관련 타입 */
export interface UserBlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  timeAgo: string;
  imageUrl: string;
}

/** 사용자 정보 카드 관련 타입 */
export interface UserInfo {
  username: string;
  email: string;
  profileImage: string;
  description: string;
}

/** 주간 기여도 데이터 타입 */
export interface ContributionData {
  weekStart: string; // ISO 형식의 날짜 문자열 (YYYY-MM-DD)
  count: number;
}

/** 기여도 툴팁 관련 타입 */
export interface ContributionTooltipProps {
  weekStart: string;
  count: number;
  position: {
    x: number;
    y: number;
  };
}

/** 사용자 블로그 컨트롤 관련 타입 */
export interface UserBlogControlsProps {
  postCount: number;
}

/** 주간 기여도 그래프 관련 타입 */
export interface WeeklyContributionGraphProps {
  data: ContributionData[];
}

/** 사용자 블로그 페이지 파라미터 타입 */
export interface UserBlogPageParams {
  params: {
    userName: string;
  };
}

// blog/post
/** 블로그 게시글 관련 타입 */
export interface BlogPostData {
  category: {
    primary: string;
    secondary: string;
  };
  title: string;
  author: string;
  date: string;
  views: string;
  content: string;
  likes: number;
}

/** 작성자 정보 관련 타입 */
export interface AuthorInfoProps {
  author: string;
  date: string;
}

/** 게시글 액션 관련 타입 */
export interface BlogPostActionsProps {
  likes: number;
}

/** 카테고리 태그 관련 타입 */
export interface CategoryTagProps {
  primary: string;
  secondary: string;
}

/** 댓글 관련 타입 */
export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  profileImage: string;
}

/** 댓글 컴포넌트 Props 타입 */
export interface BlogPostCommentsProps {
  postId: number;
}

/** 블로그 게시글 컨텐츠 Props 타입 */
export interface BlogPostContentProps {
  content: string;
}

/** 블로그 게시글 헤더 Props 타입 */
export interface BlogPostHeaderProps {
  postData: BlogPostData;
}

/** 옵션 모달 Props 타입 */
export interface OptionsModalProps {
  onEdit: () => void;
  onDelete: () => void;
}

/** 게시물 통계 Props 타입 */
export interface PostStatsProps {
  views: string;
}

/** 연관 게시물 타입 */
export interface RelatedPost {
  id: string;
  title: string;
  date: string;
}

/** 연관 게시물 컴포넌트 Props 타입 */
export interface RelatedPostsProps {
  userName: string;
  posts: RelatedPost[];
}

/** 상세 사용자 정보 Props 타입 */
export interface DetailedUserInfoProps {
  name: string;
  description: string;
  email: string;
  profileImage: string;
}

/** 블로그 게시글 페이지 Props 타입 */
export interface BlogPostPageProps {
  params: {
    postSlug: string;
  };
}

// blog/editor
/** 에디터 네비게이션 Props 타입 */
export interface EditorNavigationProps {
  onAction: (action: string, value?: string) => void;
  onComplete: () => void;
}

/** 이미지 업로드 버튼 Props 타입 */
export interface ImageUploadButtonProps {
  onImageUpload: (imageUrls: string[]) => void;
}

/** 마크다운 에디터 Props 타입 */
export interface MarkdownEditorProps {
  content: string;
  title: string;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
}

/** 마크다운 프리뷰 Props 타입 */
export interface MarkdownPreviewProps {
  content: string;
  title: string;
}

/** 출판 모달 Props 타입 */
export interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (categoryId: number, thumbnailUrl: string) => Promise<void>;
}

/** 에디터 페이지 상태 타입 */
export interface BlogEditorState {
  markdownContent: string;
  title: string;
  isModalOpen: boolean;
  isEditorScrolling: boolean;
  isPreviewScrolling: boolean;
}

/** 게시글 데이터 타입 */
export interface ArticleData {
  categoryId: number;
  title: string;
  content: string;
  thumbnailUrl: string;
}
