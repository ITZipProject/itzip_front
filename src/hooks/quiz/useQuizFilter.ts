import React, { useState, useEffect } from 'react';
import { QuizData } from '../../types/quiz/quiz';
import { useAtom } from 'jotai';
import { quizzesAtom } from '../../lib/atoms/atoms';
import { applyFilter, sortedFilteredQuizzes } from '@/utils/quiz/quizFilter';

const useQuizFilter = () => {
  const [quizzes] = useAtom(quizzesAtom);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | 'recommended'>('latest');

  const [filteredAndSortedQuizzes, setFilteredAndSortedQuizzes] = useState<QuizData[]>([]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('');
    setDifficulty(null);
    setSortOrder('latest');
  };

  useEffect(() => {
    const filtered = applyFilter(quizzes, searchTerm, category, difficulty);
    const sorted = sortedFilteredQuizzes(filtered, sortOrder);
    setFilteredAndSortedQuizzes(sorted);
  }, [quizzes, searchTerm, category, difficulty, sortOrder]);

  return {
    filteredAndSortedQuizzes,
    searchTerm,
    category,
    difficulty,
    sortOrder,
    setSearchTerm,
    setDifficulty,
    setCategory,
    resetFilters,
    setSortOrder,
  };
};

export default useQuizFilter;
