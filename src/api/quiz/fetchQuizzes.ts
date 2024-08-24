import axios from 'axios';

// 매개변수 인터페이스 정의
interface FetchQuizzesParams {
  searchTerm: string;
  category: string | number;
  difficulty: number | null;
  sortOrder: string;
  page: number;
}

// API 호출 함수
const fetchQuizzes = async ({
  searchTerm,
  category,
  difficulty,
  sortOrder,
  page,
}: FetchQuizzesParams) => {
  const response = await axios.get('/cs-quizzes/search', {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    params: {
      difficulty: difficulty,
      categoryId: category,
      sortBy: sortOrder,
      userId: 7,
      inUserSolved: false,
      page: page,
      size: 9,
      keyword: searchTerm,
    },
  });
  return response.data.data.content;
};

export default fetchQuizzes;
