'use client';
import React from 'react';
import Image from 'next/image';
import googleIcon from '../../../../public/Google.png';
import githubIcon from '../../../../public/github.png';
import { useModal } from '@/lib/context/ModalContext';
import AuthModal from '../authModal';
import { Margin } from '@/components/common/margin';

interface SignUpModalProps {
  modalId: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ modalId }) => {
  const { openModals, openModal, closeModal } = useModal();

  if (!openModals.includes(modalId)) return null;

  return (
    <AuthModal isOpen={true} onClose={() => closeModal(modalId)}>
      <div>
        <h2 className="text-[#6C6C6C] font-[500] text-[16px]">ITZIP을 다채롭게 즐기기 위해서는</h2>
        <h2 className="text-[#171717] font-[700] text-[24px]">로그인이 필요해요!</h2>
      </div>
      <div className="*:flex *:justify-center space-y-[16px]">
        <Margin height={'48px'} />
        <button onClick={() => openModal('signUpEmailModal')} className="primary-btn">
          <span>이메일로 회원가입하기</span>
        </button>
        {/* <LargeButton modalId="signinModal" btnType="primary-btn" text="이메일로 로그인" /> */}
        {/* <button onClick={() => openModal('signinModal')} className="bg-black text-white">
          이메일 로그인
        </button> */}

        <h1 className="font-[400] text-[12px] text-[#818181]">또는</h1>

        <button className="bg-[#D9D9D9] w-full h-[48px] rounded-[12px] items-center px-[12px]">
          <Image src={googleIcon} width={24} height={24} alt="googleIcon" />
          <span className="w-full text-[#171717] text-[14px] font-[600]">
            Google로 회원가입하기
          </span>
        </button>

        <button className="bg-[#555555] w-full h-[48px] rounded-[12px] items-center px-[12px]">
          <Image src={githubIcon} width={24} height={24} alt="githubIcon" />
          <span className="w-full text-[#FFFFFF] text-[14px] font-[600]">
            Github로 회원가입하기
          </span>
        </button>

        <button onClick={() => openModal('LoginModal')} className="w-full pt-[38px]">
          <h1 className="font-[400] text-[#0500E8] text-[13px] ">이미 회원이신가요?</h1>
        </button>
      </div>
    </AuthModal>
  );
};

export default SignUpModal;
