/* eslint-disable */
'use client';
import React, { useState } from 'react';

import { useSolvedacLink } from '@/api/algorithm/fetchLinkSolvedAcUser';

const SolvedacLinkModal = ({ onClose }: { onClose: () => void }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { loading, error: hookError, linkSolvedAcUser } = useSolvedacLink(inputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue) {
      setError('아이디를 입력해주세요.');
      return;
    }

    setError(null);
    await linkSolvedAcUser();

    if (!hookError) {
      onClose();
    } else {
      setError(hookError);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="relative h-[250px] w-[500px] space-y-4 rounded-xl bg-zinc-800 p-5">
        <h2 className="text-center text-xl font-bold">Solved.ac 연동을 해야 합니다!</h2>
        <p className="text-center">Solved.ac 유저 아이디를 입력해주세요</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full rounded-xl border p-2 text-gray-700"
            placeholder="아이디를 입력해 주세요"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {loading && <p className="text-sm text-gray-500">연동 중...</p>}
          <button
            type="submit"
            className="w-1/5 rounded-lg bg-white px-2 py-1 text-gray-900 transition-transform duration-200 ease-in-out hover:scale-105"
          >
            연동하기
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-lg font-bold text-gray-300"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SolvedacLinkModal;
