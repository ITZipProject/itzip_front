import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { quizzesAtom, filteredQuizzesAtom } from '../../lib/atoms/atoms';
import { QuizData } from '../../types/quiz/quiz';

const ratings = [
  { value: 1, label: 'Lv.1' },
  { value: 2, label: 'Lv.2' },
  { value: 3, label: 'Lv.3' },
];

const Filter: React.FC = () => {
  const [quizzes] = useAtom(quizzesAtom);
  const [, setFilteredQuizzes] = useAtom(filteredQuizzesAtom);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const applyFilter = () => {
      const filtered = quizzes.filter((item) => {
        const matchesSearchTerm = searchTerm ? item.question_text.includes(searchTerm) : true;
        const matchesCategory = category ? item.category === category : true;
        const matchesDifficulty = difficulty !== null ? item.difficulty === difficulty : true;

        return matchesSearchTerm && matchesCategory && matchesDifficulty;
      });

      setFilteredQuizzes(filtered);
    };

    applyFilter();
  }, [searchTerm, category, difficulty, quizzes, setFilteredQuizzes]);

  return (
    <div className="w-64 h-96 gap-8 border-2 border-gray-300 rounded-md p-4 shadow-md flex flex-col justify-center items-center">
      <div>
        <h1 className="text-xl font-bold text-center">문제 검색</h1>
        <div className="relative w-48 h-8 border-2 border-gray-300 rounded-md p-0 mt-2 flex items-center">
          <input
            type="text"
            className="w-full h-full border-none outline-none box-border px-2"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Image src="/search.png" alt="돋보기 아이콘" width={16} height={16} />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold text-center">난이도</h1>
        <div className="flex gap-5">
          {ratings.map((rating) => (
            <button
              key={rating.value}
              className={`border-2 p-2 ${difficulty === rating.value ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setDifficulty(difficulty === rating.value ? null : rating.value)}
            >
              <h3>{rating.label}</h3>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-center">카테고리</h1>
        <select
          className="px-3 py-1 bg-gray-200 rounded text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">전체</option>
          <option value="네트워크">네트워크</option>
          <option value="컴퓨터 과학">컴퓨터 과학</option>
          <option value="프로그래밍">프로그래밍</option>
          <option value="소프트웨어 공학">소프트웨어 공학</option>
          <option value="데이터베이스">데이터베이스</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
