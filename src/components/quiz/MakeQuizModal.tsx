import React, { useState } from 'react';
import { postQuiz } from '../../api/quiz/postQuizzes';
import { QuizData } from '../../types/quiz/quiz';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MakeQuizModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [answer, setAnswer] = useState<string>('');
    const [level, setLevel] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [selectedLevel, setSelectedLevel] = useState('');

    const handleSave = async () => {
        const emptyOptionsCount = options.filter((option) => option === '').length;

        if (!question || !category || !answer || !level || emptyOptionsCount > 2) {
            alert('모든 필드를 올바르게 입력하고, 선택지를 최소 2개 이상 입력하세요.');
            return;
        }

        const timestamp = new Date().toISOString();

        const quizData: QuizData = {
            question,
            category,
            answer: answer ? Number(answer) : 0,
            level,
            options,
            username: '아이언맨1',
            correctRate: 18,
            timestamp,
            likes: 0,
        };

        try {
            await postQuiz(quizData);

            onClose();
        } catch (error) {
            alert('문제 생성 중 오류가 발생했습니다.');
            console.error('문제 생성 에러:', error);
        }
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
                        className={`flex-grow h-full border border-gray-300 outline-none box-border px-2 ${
                            !question ? 'border-red-500' : ''
                        }`}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="flex gap-7">
                    <h3>카테고리</h3>
                    <select
                        className={`px-3 py-1 bg-gray-200 rounded text-sm ${
                            !category ? 'border-red-500' : ''
                        }`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">목록</option>
                        <option value="프론트엔드">프론트엔드</option>
                        <option value="백엔드">백엔드</option>
                    </select>
                </div>
                <div className="w-full flex items-center space-x-4">
                    <h3>정답</h3>
                    <input
                        type="number"
                        className={`flex-grow h-full border border-gray-300 outline-none box-border px-2 ${
                            !answer ? 'border-red-500' : ''
                        }`}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 items-center">
                    <h3>난이도</h3>
                    <div className="flex gap-5">
                        {['Lv.1', 'Lv.2', 'Lv.3'].map((lvl, index) => (
                            <button
                                key={index}
                                className={`border-2 p-2 ${
                                    selectedLevel === lvl ? 'bg-blue-500 text-white' : ''
                                }`}
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
                <div className="flex gap-4">
                    <h3>선택지</h3>
                    <div className="flex flex-col gap-4">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center justify-center gap-3">
                                <h3>{index + 1}번</h3>
                                <input
                                    type="text"
                                    className={`flex-grow h-full border border-gray-300 outline-none box-border px-2 ${
                                        option === '' ? 'border-red-500' : ''
                                    }`}
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
