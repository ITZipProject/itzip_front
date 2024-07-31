import React from 'react';

interface MainProps {
  searchTerm: string;
}

const Main: React.FC<MainProps> = ({ searchTerm }) => {
  const quizData = [
    { id: '1918', title: '후위 표기식', solvedCount: '1,044명이 푼 문제' },
    { id: '1919', title: '중위 표기식', solvedCount: '945명이 푼 문제' },
    { id: '1920', title: '전위 표기식', solvedCount: '876명이 푼 문제' },
    { id: '1921', title: '재귀 함수', solvedCount: '800명이 푼 문제' },
    { id: '1922', title: '이진 탐색', solvedCount: '750명이 푼 문제' },
    { id: '1918', title: '후위 표기식', solvedCount: '1,044명이 푼 문제' },
    { id: '1919', title: '중위 표기식', solvedCount: '945명이 푼 문제' },
    { id: '1920', title: '전위 표기식', solvedCount: '876명이 푼 문제' },
    { id: '1921', title: '재귀 함수', solvedCount: '800명이 푼 문제' },
    { id: '1922', title: '이진 탐색', solvedCount: '750명이 푼 문제' },
    { id: '1918', title: '후위 표기식', solvedCount: '1,044명이 푼 문제' },
    { id: '1919', title: '중위 표기식', solvedCount: '945명이 푼 문제' },
    { id: '1920', title: '전위 표기식', solvedCount: '876명이 푼 문제' },
    { id: '1921', title: '재귀 함수', solvedCount: '800명이 푼 문제' },
    { id: '1922', title: '이진 탐색', solvedCount: '750명이 푼 문제' },
  ];

  const filteredQuizData = quizData.filter(
    (quiz) => quiz.title.includes(searchTerm) || quiz.id.includes(searchTerm),
  );

  return (
    <div className="flex flex-col gap-3 h-full p-4 bg-white border-2 rounded-md shadow-md overflow-auto">
      <div className="flex justify-end gap-8 mb-4">
        <button className="border border-gray-400 bg-blue-500 text-white py-2 px-3 rounded">
          문제 랜덤
        </button>
        <button className="border border-gray-400 bg-blue-500 text-white py-2 px-3 rounded">
          문제 추천
        </button>
      </div>
      <div className="w-full border-2 rounded-md">
        <div className="flex justify-between p-5 border-b-2 bg-gray-100">
          <h3>ID</h3>
          <h3>제목</h3>
          <h3>푼 사람 수</h3>
        </div>
        {filteredQuizData.map((quiz, index) => (
          <div key={index} className="flex justify-between p-5 border-b-2">
            <h3>{quiz.id}</h3>
            <h3>{quiz.title}</h3>
            <h3>{quiz.solvedCount}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
