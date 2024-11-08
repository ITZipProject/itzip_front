'use client';

import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { z } from 'zod';

import Input from '@/components/common/input';
import { Margin } from '@/components/common/margin';
import Modal from '@/components/portal/modal';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import { useModal } from '@/lib/context/ModalContext';
import { setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore';

import { loginAction } from './actions';
import { AuthButton } from '../auth/authButton';

interface SignInModalProps {
  modalId: string;
}

const formValueSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.')
    .toLowerCase(),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(PASSWORD_MIN_LENGTH, `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

interface InputErrors {
  email: string | undefined;
  password: string | undefined;
}

const EmailLoginModal: React.FC<SignInModalProps> = ({ modalId }) => {
  const { openModals, closeModal, openModal } = useModal();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [, setAccessToken] = useAtom(setAccessTokenAtom);
  const [, setRefreshToken] = useAtom(setRefreshTokenAtom);

  // 각 필드별 에러 상태 추가
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    email: undefined,
    password: undefined,
  });

  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  const handleReset = (field: 'email' | 'password') => {
    setFormValues((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 입력 시 해당 필드의 에러 초기화
    setInputErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setInputErrors({ email: undefined, password: undefined });

    try {
      const validationResult = formValueSchema.safeParse(formValues);
      if (!validationResult.success) {
        const fieldErrors: InputErrors = {
          email: undefined,
          password: undefined,
        };

        validationResult.error.errors.forEach((error) => {
          const field = error.path[0] as keyof InputErrors;
          fieldErrors[field] = error.message;
        });

        setInputErrors(fieldErrors);
        return;
      }

      const validatedData = validationResult.data;
      const result = await loginAction(validatedData.email, validatedData.password);

      if (result.success) {
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
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void login(e);
        }}
        className="w-full space-y-4"
      >
        <Input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          labelTitle="email"
          title="이메일"
          onChange={handleInputChange}
          placeholder="ID@example.com"
          required
          minLength={2}
          onClick={() => handleReset('email')}
          errors={inputErrors?.email}
        />

        <Input
          id="password"
          name="password"
          type="password"
          labelTitle="password"
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={formValues.password}
          onChange={handleInputChange}
          required
          minLength={2}
          onClick={() => handleReset('password')}
          errors={inputErrors.password}
        />

        <AuthButton disabled={isLoading}>가입하기</AuthButton>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Modal>
  );
};

export default EmailLoginModal;
