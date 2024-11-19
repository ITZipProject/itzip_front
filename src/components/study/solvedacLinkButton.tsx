'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { useSolvedacLinkStatus } from '@/api/algorithm/fetchCheckSolvedAcUser';

import SolvedacLinkModal from './solvedacLinkModal';

const SOLVED_AC_ICON = '/solvedac-connect-icon.png';

const SolvedacLinkButton = () => {
  const { isSolvedacLinked, loading, error } = useSolvedacLinkStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading || error || isSolvedacLinked) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-6 rounded-2xl border border-gray-400 bg-zinc-700 px-5 py-2">
        <h3 className="text-xl font-medium">Solved.ac와 연동이 필요합니다!</h3>
        <button
          className="flex items-center justify-center gap-2 rounded-xl border bg-zinc-800 px-4 py-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Image src={SOLVED_AC_ICON} width={16} height={16} alt="solvedac 아이콘" />
          <p>연동하기</p>
        </button>
      </div>

      {isModalOpen && <SolvedacLinkModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default SolvedacLinkButton;
