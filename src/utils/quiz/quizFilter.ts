import { QuizData } from '@/types/quiz/quiz';

export const applyFilter = (
  quizzes: QuizData[],
  searchTerm: string,
  category: string,
  difficulty: number | null,
) => {
  return quizzes.filter((item) => {
    const matchesSearchTerm = searchTerm ? item.questionText.includes(searchTerm) : true;
    const matchesCategory = category ? item.category === category : true;
    const matchesDifficulty = difficulty !== null ? item.difficulty === difficulty : true;

    return matchesSearchTerm && matchesCategory && matchesDifficulty;
  });
};

export const sortedFilteredQuizzes = (
  filteredQuizzes: QuizData[],
  sortOrder: 'latest' | 'oldest' | 'recommended',
) => {
  return filteredQuizzes.slice().sort((a, b) => {
    if (sortOrder === 'recommended') {
      return b.acceptedUserCount - a.acceptedUserCount;
    }
    const dateA = new Date(a.create_date).getTime();
    const dateB = new Date(b.create_date).getTime();
    return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA;
  });
};
