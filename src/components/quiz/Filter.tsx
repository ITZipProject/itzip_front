"use client";

import React, { useState } from "react";
import { QuizData } from "../../types/quiz/quiz";

interface FilterProps {
  quizzes: QuizData[];
  setFilteredQuizzes: React.Dispatch<React.SetStateAction<QuizData[]>>;
}

const ratings = [
  { value: "레벨1", label: "Lv.1" },
  { value: "레벨2", label: "Lv.2" },
  { value: "레벨3", label: "Lv.3" },
];

const Filter: React.FC<FilterProps> = ({ quizzes, setFilteredQuizzes }) => {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const applyFilter = () => {
    const filtered = quizzes.filter((item) => {
      const matchesSearchTerm = searchTerm
        ? item.question.includes(searchTerm)
        : true;
      const matchesCategory = category ? item.category === category : true;
      const matchesRating =
        difficulty !== null ? item.level === difficulty : true;

      return matchesSearchTerm && matchesCategory && matchesRating;
    });

    setFilteredQuizzes(filtered);
  };

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
          <img
            src={"./search.png"}
            alt="돋보기 아이콘"
            className="w-4 h-4 mr-2"
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold text-center">난이도</h1>
        <div className="flex gap-5">
          {ratings.map((rating) => (
            <button
              key={rating.value}
              className={`border-2 p-2 ${
                difficulty === rating.value ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() =>
                setDifficulty(difficulty === rating.value ? null : rating.value)
              }
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
          <option value="프론트엔드">프론트엔드</option>
          <option value="백엔드">백엔드</option>
        </select>
      </div>
      <div>
        <button
          className="border border-gray-400 bg-blue-500 text-white py-2 px-3 rounded"
          onClick={applyFilter}
        >
          문제 찾기
        </button>
      </div>
    </div>
  );
};

export default Filter;
