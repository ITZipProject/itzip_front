import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { quizzesAtom, filteredQuizzesAtom } from '../../lib/atoms/atoms';
import { QuizData } from '../../types/quiz/quiz';
import QuizCard from './QuizCard';
import MakeQuizModal from './MakeQuizModal';
import QuizShowModal from './QuizShowModal';

const ratings = [
  { value: 1, label: 'Lv.1' },
  { value: 2, label: 'Lv.2' },
  { value: 3, label: 'Lv.3' },
];

const QuizFilterAndTopBar: React.FC = () => {
  const [quizzes] = useAtom(quizzesAtom);
  const [, setFilteredQuizzes] = useAtom(filteredQuizzesAtom);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | 'recommended'>('latest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);
  const [filteredAndSortedQuizzes, setFilteredAndSortedQuizzes] = useState<QuizData[]>([]);

  useEffect(() => {
    const applyFilter = () => {
      const filtered = quizzes.filter((item) => {
        const matchesSearchTerm = searchTerm ? item.question_text.includes(searchTerm) : true;
        const matchesCategory = category ? item.category === category : true;
        const matchesDifficulty = difficulty !== null ? item.difficulty === difficulty : true;

        return matchesSearchTerm && matchesCategory && matchesDifficulty;
      });

      setFilteredQuizzes(filtered);
      return filtered;
    };

    const sortedFilteredQuizzes = (filteredQuizzes: QuizData[]) => {
      return filteredQuizzes.slice().sort((a, b) => {
        if (sortOrder === 'recommended') {
          return b.accepted_user_count - a.accepted_user_count;
        }
        const dateA = new Date(a.create_date).getTime();
        const dateB = new Date(b.create_date).getTime();
        return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA;
      });
    };

    const filtered = applyFilter();
    setFilteredAndSortedQuizzes(sortedFilteredQuizzes(filtered));
  }, [searchTerm, category, difficulty, quizzes, sortOrder, setFilteredQuizzes]);

  const handleAddQuiz = () => {
    setIsModalOpen(true);
  };

  const handleCardClick = (quiz: QuizData) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('');
    setDifficulty(null);
    setSortOrder('latest');
    setFilteredQuizzes(quizzes);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 gap-12 overflow-y-auto bg-black text-white">
      <div className="flex gap-5">
        {/* 문제 만들기 버튼 */}
        <div
          onClick={handleAddQuiz}
          style={{ width: '300px', height: '250px' }}
          className="flex items-center justify-center border-2 border-gray-400 bg-gray-800 rounded-lg cursor-pointer"
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <Image
              src="/QuizAddImage.png"
              alt="카드이미지"
              width={48}
              height={48}
              className="rounded-full"
            />
            <h3 className="font-semibold text-xl text-slate-300">문제 만들기</h3>
            <div className="flex flex-col justify-center items-center">
              <h3 className="font-semibold text-sm text-slate-400">나만의 문제를 만들어</h3>
              <h3 className="font-semibold text-sm text-slate-400">공유해보세요.</h3>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold">기술퀴즈 둘러보기</h3>

      {/* 기술퀴즈 둘러보기 상단바 */}
      <div className="flex justify-between border-t-2 border-gray-600 p-4">
        {/* 필터 섹션 */}
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            className="p-2 rounded-lg border-none outline-none box-border placeholder:text-sm placeholder:text-gray-400  bg-slate-800"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className=" rounded-lg border-none outline-none box-border placeholder:text-sm placeholder:text-gray-400 text-white bg-slate-800"
            value={difficulty ?? ''}
            onChange={(e) => setDifficulty(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">난이도</option>
            {ratings.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded-lg border-none outline-none box-border placeholder:text-sm placeholder:text-gray-400 text-white bg-slate-800"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리</option>
            <option value="네트워크">네트워크</option>
            <option value="컴퓨터 과학">컴퓨터 과학</option>
            <option value="프로그래밍">프로그래밍</option>
            <option value="소프트웨어 공학">소프트웨어 공학</option>
            <option value="데이터베이스">데이터베이스</option>
          </select>

          {/* 필터 초기화 버튼 */}
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-700 rounded text-sm text-slate-400"
          >
            필터 초기화
          </button>
        </div>

        {/* 정렬 및 문제 만들기 버튼 섹션 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center h-16 gap-8">
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setSortOrder('latest')}
                disabled={sortOrder === 'latest'}
                className={`py-2 px-4 rounded text-slate-400 ${sortOrder === 'latest' ? 'text-slate-200 font-bold' : ''}`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortOrder('oldest')}
                disabled={sortOrder === 'oldest'}
                className={`py-2 px-4 rounded text-slate-400 ${sortOrder === 'oldest' ? 'text-slate-200 font-bold' : ''}`}
              >
                오래된 순
              </button>
              <button
                onClick={() => setSortOrder('recommended')}
                disabled={sortOrder === 'recommended'}
                className={`py-2 px-4 rounded text-slate-400 ${sortOrder === 'recommended' ? 'text-slate-200 font-bold' : ''}`}
              >
                추천순
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 퀴즈 목록 섹션 */}
      <div className="flex flex-col gap-20">
        <div className="flex justify-between">
          <div className="flex w-1/2 justify-start text-slate-400">
            <h3>문제</h3>
          </div>
          <div className="flex w-1/3 gap-5 justify-between">
            <h3 className="w-1/3 text-center text-slate-400">카테고리</h3>
            <h3 className="w-1/3 text-center text-slate-400">난이도</h3>
            <h3 className="w-1/3 text-center text-slate-400">정답률</h3>
          </div>
        </div>
        <div className="flex flex-col w-full gap-10">
          {filteredAndSortedQuizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} onClick={() => handleCardClick(quiz)} />
          ))}
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && selectedQuiz && (
        <QuizShowModal isOpen={isModalOpen} onClose={closeModal} {...selectedQuiz} />
      )}
      {isModalOpen && !selectedQuiz && <MakeQuizModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default QuizFilterAndTopBar;
