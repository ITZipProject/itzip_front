'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { useSolvedacLinkStatus } from '@/api/algorithm/fetchCheckSolvedAcUser';

import SolvedacLinkModal from './solvedacLinkModal';

const SolvedacLinkButton = () => {
  const { isSolvedacLinked, loading, error } = useSolvedacLinkStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  if (isSolvedacLinked) {
    return <></>;
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-6 rounded-2xl border border-gray-400 bg-zinc-700 px-5 py-2">
        <h3 className="text-xl font-medium">Solved.ac와 연동이 필요합니다!</h3>
        <button
          className="flex items-center justify-center gap-2 rounded-xl border bg-zinc-800 px-4 py-2"
          onClick={handleOpenModal}
        >
          <Image src="/solvedac-connect-icon.png" width={16} height={16} alt="solvedacIcon" />
          <p>연동하기</p>
        </button>
      </div>

      {isModalOpen && <SolvedacLinkModal onClose={handleCloseModal} />}
    </div>
  );
};

export default SolvedacLinkButton;
