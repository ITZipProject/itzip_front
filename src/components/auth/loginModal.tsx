'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import googleIcon from '../../../public/Google.png';
import githubIcon from '../../../public/github.png';
import { useModal } from '@/lib/context/ModalContext';
import Modal from './commonModal';

interface SignUpModalProps {
  modalId: string;
}

const emailLoginModal: React.FC<SignUpModalProps> = ({ modalId }) => {
  const { openModals, openModal, closeModal } = useModal();

  if (!openModals.includes(modalId)) return null;

  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)} title="로그인해볼까요?">
      <div className="w-full px-[60px] space-y-2 *:w-[334px] *:h-[48px] *:justify-center *:items-center *:flex *:font-[400] text-[14px] *:rounded-[16px]">
        <button onClick={() => openModal('signinModal')} className="bg-black text-white">
          이메일 로그인
        </button>
        <h1 className="font-[400] text-[12px] text-[#818181]">또는</h1>
        <Link href={''} className="bg-[#E4E4E4] gap-[10px]">
          <Image src={googleIcon} width={24} height={24} alt="googleIcon" />
          Google로 로그인
        </Link>
        <Link href={''} className="bg-[#454545] text-white gap-[10px]">
          <Image src={githubIcon} width={24} height={24} alt="githubIcon" />
          Github로 로그인
        </Link>
        <div className="flex flex-col items-center">
          <h1 className="my-[16px] underline font-[400] text-[13px] underline-offset-4">
            아직 계정이 없으신가요?
          </h1>
        </div>
      </div>
    </Modal>
  );
};

export default emailLoginModal;
