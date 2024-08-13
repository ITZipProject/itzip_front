'use client';

import React, { useState } from 'react';
import Modal from '../authModal';
import Input from '../../common/input';
import Button from '../authButton';
import { useModal } from '@/lib/context/ModalContext';
import { useFormState } from 'react-dom';
import { login } from '@/app/(Auth)/sign-in/action';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Margin } from '@/components/common/margin';
import { signUp } from '@/app/(Auth)/sign-up/actions';

interface SignInModalProps {
  modalId: string;
  email?: string;
}

const VerifyModal: React.FC<SignInModalProps> = ({ modalId, email }) => {
  const { openModals, closeModal, openModal } = useModal();
  const [state, action] = useFormState(signUp, null);
  const [code, setCode] = useState('');

  const handleReset = () => {
    setCode('');
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'code') {
      setCode(value);
    }
  };
  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)}>
      <button onClick={() => openModal('signUpModal')} className="flex items-center">
        <ChevronLeftIcon className="size-1/6 -ml-4" />
        <h1 className="font-[700] text-[24px]">이메일로 인증하기</h1>
      </button>
      <div className="flex flex-col *:text-[#6C6C6C] *:text-[16px] font-[600]">
        <span>마지막 단계입니다.</span>
        <span>인증메일이 아래 메일 주소로 발송되었습니다.</span>
      </div>
      <Margin height={'48px'} />
      <form action={action} className="w-full space-y-4">
        <div>{email}</div>
        <div className="flex items-center">
          <label htmlFor="code">인증번호</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          id="code"
          name="code"
          type="number"
          value={code}
          onChange={onChangeCode}
          placeholder="인증번호를 입력해주세요."
          required
          minLength={2}
          onClick={handleReset}
          errors={state?.fieldErrors.email}
        />

        <Button modalId="" text="인증번호 확인" />
        <div className="flex flex-col items-center">
          <h1 className="text-[12px] font-[500] text-[#818181]">메일을 못받으셨나요?</h1>
          <button
            onClick={() => openModal('LoginModal')}
            className="my-[16px] text-[#0500E8] hover:underline underline-offset-4"
          >
            이메일 다시 보내기
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default VerifyModal;
