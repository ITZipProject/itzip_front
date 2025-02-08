'use client';

import Image from 'next/image';
import React from 'react';

import SmallAsk from '@/components/auth/smallAsk';
import { Margin } from '@/components/common/margin';
import Modal from '@/components/portal/modal';
import { useModal } from '@/lib/context/ModalContext';

import githubIcon from '../../../../public/github.png';
import googleIcon from '../../../../public/Google.png';
import { Button } from '@/components/ui/button';

interface SignUpModalProps {
  modalId: string;
}

const LoginModal: React.FC<SignUpModalProps> = ({ modalId }) => {
  const { openModals, openModal, closeModal } = useModal();

  if (!openModals.includes(modalId)) return null;

  return (
    <Modal isOpen={true} onClose={() => closeModal()}>
      <div>
        <h2 className="text-[16px] font-[500] text-[#6C6C6C]">ITZIP을 다채롭게 즐기기 위해서는</h2>
        <h2 className="text-[24px] font-[700] text-Grey-900">로그인이 필요해요!</h2>
      </div>
      <div className="space-y-4 *:flex *:justify-center">
        <Margin height={'48px'} />
        <Button
          variant="default"
          onClick={() => openModal('EmailLoginModal')}
          className="w-full h-[50px]"
        >
          <span className="text-[14px] font-[600] ">이메일로 로그인</span>
        </Button>

        <h1 className="text-12 font-[400] text-[#818181]">또는</h1>

        <button className="h-[50px] w-full items-center rounded-radius-03 bg-gray-300 px-[16px]">
          <Image src={googleIcon} width={24} height={24} alt="googleIcon" />
          <span className="w-full text-[14px] font-[600] text-foreground">Google로 로그인하기</span>
        </button>

        <button className="h-[50px] w-full items-center rounded-radius-03 bg-[#181717] px-[16px]">
          <Image src={githubIcon} width={24} height={24} alt="githubIcon" />
          <span className="w-full text-[14px] font-[600] text-[#FFFFFF]">Github로 로그인하기</span>
        </button>

        <div className="w-full pt-[38px]">
          <SmallAsk text="아직 계정이 없으신가요?" modalName="signUpModal" />
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
