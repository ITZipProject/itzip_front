'use client';

import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

import Input from '@/components/common/input';
import { Margin } from '@/components/common/margin';
import { useModal } from '@/lib/context/ModalContext';
import { setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore';

import { loginAction } from './actions';
import Modal from '../auth/authModal';

interface SignInModalProps {
  modalId: string;
}

const EmailLoginModal: React.FC<SignInModalProps> = ({ modalId }) => {
  const { openModals, closeModal, openModal } = useModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [, setAccessToken] = useAtom(setAccessTokenAtom);
  const [, setRefreshToken] = useAtom(setRefreshTokenAtom);

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

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginAction(email, password);
      if (result.success) {
        // 토큰 저장
        if (result.accessToken && result.refreshToken) {
          setAccessToken(result.accessToken);
          setRefreshToken(result.refreshToken);
          closeModal('EmailLoginModal');
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)}>
      <button onClick={() => openModal('LoginModal')} className="flex items-center">
        <ChevronLeftIcon className="-ml-4 size-1/6" />
        <h1 className="text-24 font-[700]">이메일로 로그인하기</h1>
      </button>
      <Margin height={'48px'} />
      <form onSubmit={login} className="w-full space-y-4">
        <Input
          name="email"
          type="email"
          value={email}
          labelTitle="email"
          title="이메일"
          onChange={handleInputChange}
          placeholder="ID@example.com"
          required
          minLength={2}
          onClick={() => handleReset('email')}
        />

        <Input
          name="password"
          type="password"
          labelTitle="password"
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={handleInputChange}
          required
          minLength={2}
          onClick={() => handleReset('password')}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="primary-btn h-spacing-12 rounded-radius-03 bg-Grey-100 text-14 font-semibold text-white disabled:cursor-not-allowed disabled:bg-Grey-100 disabled:text-white"
        >
          {isLoading ? '로그인 중...' : '이메일로 로그인하기'}
        </button>
        {/* 비밀번호 찾기 미구현 */}
        {/* <div className="flex flex-col items-center">
          <h1 className="text-[12px] font-[500] text-[#818181]">또는</h1>
          <h1 className="my-[16px] text-[#0500E8] hover:underline underline-offset-4">
            비밀번호 찾기
          </h1>
        </div> */}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Modal>
  );
};

export default EmailLoginModal;
