"use client";

import React, { useState } from "react";
import { QuizData } from "../../types/quiz/quiz";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quizData: QuizData) => void;
}

const MakeQuizModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [username, setUsername] = useState("아이언맨1");
  const [correctRate, setCorrectRate] = useState(18);
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleSave = () => {
    const quizData: QuizData = {
      question,
      category,
      answer,
      level,
      options,
      username,
      correctRate,
    };
    onSave(quizData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg relative w-3/4 h-3/4 max-w-5xl max-h-screen overflow-auto space-y-8">
        <div className="flex justify-end">
          <button className="m-2" onClick={onClose}>
            X
          </button>
        </div>
        <div className="w-full flex items-center space-x-4">
          <h3>문제</h3>
          <input
            type="text"
            className="flex-grow h-full border border-gray-300 outline-none box-border px-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="flex gap-7">
          <h3>카테고리</h3>
          <select
            className="px-3 py-1 bg-gray-200 rounded text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">목록</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>
        <div className="w-full flex items-center space-x-4">
          <h3>정답</h3>
          <input
            type="text"
            className="flex-grow h-full border border-gray-300 outline-none box-border px-2"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <h3>난이도</h3>
          <div className="flex gap-5">
            <button
              className={`border-2 p-2 ${
                selectedLevel === "Lv.1" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => {
                setLevel("Lv.1");
                setSelectedLevel("Lv.1");
              }}
            >
              <h3>레벨1</h3>
            </button>
            <button
              className={`border-2 p-2 ${
                selectedLevel === "Lv.2" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => {
                setLevel("Lv.2");
                setSelectedLevel("Lv.2");
              }}
            >
              <h3>레벨2</h3>
            </button>
            <button
              className={`border-2 p-2 ${
                selectedLevel === "Lv.3" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => {
                setLevel("Lv.3");
                setSelectedLevel("Lv.3");
              }}
            >
              <h3>레벨3</h3>
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <h3>선택지</h3>
          <div className="flex flex-col gap-4">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3"
              >
                <h3>{index + 1}번</h3>
                <input
                  type="text"
                  className="flex-grow h-full border border-gray-300 outline-none box-border px-2"
                  value={option}
                  onChange={(e) =>
                    setOptions((prevOptions) => {
                      const newOptions = [...prevOptions];
                      newOptions[index] = e.target.value;
                      return newOptions;
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center mx-40 border-2">
          <button onClick={handleSave}>문제 생성</button>
        </div>
      </div>
    </div>
  );
};

export default MakeQuizModal;
