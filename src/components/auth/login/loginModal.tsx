'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import googleIcon from '../../../../public/Google.png';
import githubIcon from '../../../../public/github.png';
import { useModal } from '@/lib/context/ModalContext';
import Modal from '../authModal';
import { Margin } from '@/components/common/margin';
import { LargeButton } from '@/components/common/button';

interface SignUpModalProps {
  modalId: string;
}

const emailLoginModal: React.FC<SignUpModalProps> = ({ modalId }) => {
  const { openModals, openModal, closeModal } = useModal();

  if (!openModals.includes(modalId)) return null;

  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)} title="로그인이 필요해요!">
      <div className="*:flex *:justify-center space-y-[16px]">
        <Margin height={'48px'} />
        <button onClick={() => openModal('signinModal')} className="primary-btn">
          <span>이메일로 로그인</span>
        </button>
        {/* <LargeButton modalId="signinModal" btnType="primary-btn" text="이메일로 로그인" /> */}
        {/* <button onClick={() => openModal('signinModal')} className="bg-black text-white">
          이메일 로그인
        </button> */}

        <h1 className="font-[400] text-[12px] text-[#818181]">또는</h1>

        <button className="bg-[#D9D9D9] w-full h-[48px] rounded-[12px] items-center px-[12px]">
          <Image src={googleIcon} width={24} height={24} alt="googleIcon" />
          <span className="w-full text-[#171717] text-[14px] font-[600]">Google로 로그인하기</span>
        </button>

        <button className="bg-[#555555] w-full h-[48px] rounded-[12px] items-center px-[12px]">
          <Image src={githubIcon} width={24} height={24} alt="githubIcon" />
          <span className="w-full text-[#FFFFFF] text-[14px] font-[600]">Github로 로그인하기</span>
        </button>

        <div className="pt-[38px] flex flex-col items-center">
          <h1 className="font-[400] text-[#0500E8] text-[13px] ">아직 계정이 없으신가요?</h1>
        </div>
      </div>
    </Modal>
  );
};

export default emailLoginModal;
