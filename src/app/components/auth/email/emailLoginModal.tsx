'use client';

import React, { useState } from 'react';
import Modal from '../authModal';
import Input from '../../../../components/common/input';
import Button from '../authButton';
import { useModal } from '@/lib/context/ModalContext';
import { useFormState } from 'react-dom';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Margin } from '@/components/common/margin';
import { login } from './action';

interface SignInModalProps {
  modalId: string;
}

const EmailLoginModal: React.FC<SignInModalProps> = ({ modalId }) => {
  const { openModals, closeModal, openModal } = useModal();
  const [state, action] = useFormState(login, null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  const handleReset = (field: 'email' | 'password') => {
    if (field === 'email') {
      setEmail('');
    } else if (field === 'password') {
      setPassword('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // + 로그인시 모달 닫기 로직 추가
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await login(null, formData);
    if (!result?.fieldErrors) {
      closeModal(modalId);
    }
  };

  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)}>
      <button onClick={() => openModal('LoginModal')} className="flex items-center">
        <ChevronLeftIcon className="size-1/6 -ml-4" />
        <h1 className="font-[700] text-[24px]">이메일로 로그인하기</h1>
      </button>
      <Margin height={'48px'} />
      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div className="flex items-center">
          <label htmlFor="email">이메일</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="ID@example.com"
          required
          minLength={2}
          onClick={() => handleReset('email')}
          errors={state?.fieldErrors.email}
        />
        <div className="flex items-center">
          <label htmlFor="email">비밀번호</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={handleInputChange}
          required
          minLength={2}
          onClick={() => handleReset('password')}
          errors={state?.fieldErrors.password}
        />
        <div className="flex items-center bg-[#EDECFC] p-[12px]">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            className="size-[16px] border border-[##C6C6C6] outline-none ring-0"
          />
          <label htmlFor="remember" className="ml-[9px] text-[#8F8F8F]">
            로그인 상태 유지
          </label>
        </div>

        <Button modalId="" text="이메일로 로그인하기" />
        <div className="flex flex-col items-center">
          <h1 className="text-[12px] font-[500] text-[#818181]">또는</h1>
          <h1 className="my-[16px] text-[#0500E8] hover:underline underline-offset-4">
            비밀번호 찾기
          </h1>
        </div>
      </form>
    </Modal>
  );
};

export default EmailLoginModal;
