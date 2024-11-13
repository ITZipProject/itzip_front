'use client';

import Image from 'next/image';
import React from 'react';

import SmallAsk from '@/components/auth/smallAsk';
import { Margin } from '@/components/common/margin';
import Modal from '@/components/portal/modal';
import { useModal } from '@/lib/context/ModalContext';

import githubIcon from '../../../../public/github.png';
import googleIcon from '../../../../public/Google.png';

interface SignUpModalProps {
  modalId: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ modalId }) => {
  const { openModals, openModal, closeModal } = useModal();

  if (!openModals.includes(modalId)) return null;

  return (
    <Modal isOpen={true} onClose={() => closeModal()}>
      <div>
        <h2 className="text-16 font-[500] text-[#6C6C6C]  ">ITZIP을 다채롭게 즐기기 위해서는</h2>
        <h2 className="text-24 font-[700] text-[#191919]">로그인이 필요해요!</h2>
      </div>
      <div className="space-y-spacing-05 *:flex *:justify-center">
        <Margin height={'48px'} />
        <button onClick={() => openModal('signUpEmailModal')} className="primary-btn">
          <span>이메일로 회원가입하기</span>
        </button>

        <h1 className="text-12 font-[400] text-[#818181]">또는</h1>

        <button className="flex h-spacing-12 w-full items-center rounded-radius-03 bg-Grey-300 px-spacing-04">
          <Image src={googleIcon} width={24} height={24} alt="googleIcon" />
          <span className="w-full text-14 font-[600] text-[#191919]">Google로 회원가입하기</span>
        </button>

        <button className="flex h-spacing-12 w-full items-center rounded-radius-03 bg-Grey-700 px-spacing-04">
          <Image src={githubIcon} width={24} height={24} alt="githubIcon" />
          <span className="w-full text-14 font-[600] text-[#FFFFFF]">Github로 회원가입하기</span>
        </button>

        <div className="w-full pt-[38px]">
          <SmallAsk text="이미 회원이신가요?" modalName="LoginModal" />
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;
