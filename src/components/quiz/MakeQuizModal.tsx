import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { quizzesAtom } from '../../lib/atoms/atoms';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MakeQuizModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [answer, setAnswer] = useState<string>('');
  const [level, setLevel] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [selectedLevel, setSelectedLevel] = useState('');

  if (!isOpen) return null;

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions((prevOptions) => {
        const newOptions = [...prevOptions];
        newOptions.splice(index, 1);
        if (answer === prevOptions[index]) {
          setAnswer('');
        }
        return newOptions;
      });
    }
  };

  const handleCreateQuiz = () => {
    const newQuiz = {
      _id: Math.random().toString(36).substr(2, 9),
      question_text: question,
      difficulty: parseInt(level.replace('레벨', '')),
      category,
      answer: options.indexOf(answer) + 1,
      create_date: new Date().toISOString(),
      modify_date: new Date().toISOString(),
      accepted_user_count: 0,
      tried_user_count: 0,
      points: 0,
      create_user_id: '1234567890123456789',
      choices: options.map((option, index) => ({ id: index + 1, choice_text: option })),
    };
    setQuizzes([...quizzes, newQuiz]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white px-8 rounded shadow-lg relative w-1/2 h-5/6 max-w-5xl max-h-screen overflow-auto space-y-8">
        <div className="flex justify-end">
          <button className="m-2" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col gap-4 w-full space-x-4">
          <h3>문제</h3>
          <input
            type="text"
            className={'flex-grow h-full border border-gray-300 outline-none box-border px-2'}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-7">
          <h3>카테고리</h3>
          <select
            className={'px-3 py-1 bg-gray-200 rounded text-sm'}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">목록</option>
            <option value="프론트엔드">프론트엔드</option>
            <option value="백엔드">백엔드</option>
          </select>
        </div>
        <div className="flex flex-col w-3/4 gap-4 ">
          <h3>난이도</h3>
          <div className="flex gap-5 justify-between">
            {['Lv.1', 'Lv.2', 'Lv.3'].map((lvl, index) => (
              <button
                key={index}
                className={`border-2 px-12 py-2 rounded-md ${selectedLevel === lvl ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => {
                  setLevel(`레벨${index + 1}`);
                  setSelectedLevel(lvl);
                }}
              >
                <h3>{lvl}</h3>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3>선택지</h3>
            {options.length < 4 && (
              <button
                className="py-1 px-3 bg-slate-500 text-white rounded hover:bg-slate-500 f "
                onClick={addOption}
              >
                선택지 추가
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="answer"
                  checked={answer === option}
                  onChange={() => setAnswer(option)}
                />
                <input
                  type="text"
                  className={'flex-grow h-full border border-gray-300 outline-none box-border px-2'}
                  value={option}
                  onChange={(e) =>
                    setOptions((prevOptions) => {
                      const newOptions = [...prevOptions];
                      newOptions[index] = e.target.value;
                      return newOptions;
                    })
                  }
                />
                {options.length > 2 && <button onClick={() => removeOption(index)}>X</button>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mx-40 ">
          <button
            className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600  disabled:bg-gray-400`}
            onClick={handleCreateQuiz}
            disabled={
              !question || !category || !answer || !level || options.some((option) => option === '')
            }
          >
            문제 생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeQuizModal;
