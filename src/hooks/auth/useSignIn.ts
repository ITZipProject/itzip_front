'use client';

import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // 페이지 리디렉션
import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';
import { z } from 'zod';

import { loginAction } from '@/api/auth/auth.action';
import { logoutAction } from '@/api/mypage/mypage.action';
import { errorsAtom, formValuesAtom, isOkAtom, loadingAtom } from '@/atoms/formAtoms'; // 상태 관리
import { PASSWORD_MIN_LENGTH } from '@/lib/constants'; // 상수
import { useModal } from '@/lib/context/ModalContext'; // 모달 컨텍스트
import { setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore'; // 토큰 저장
import { FormValues } from '@/types/auth'; // 폼 값 타입 정의

// 폼 유효성 검사 스키마
const formValueSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.')
    .toLowerCase(), // 이메일 소문자로 변환
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(PASSWORD_MIN_LENGTH, `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`),
});

const useSignIn = () => {
  const [formValues, setFormValues] = useAtom(formValuesAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [isOk] = useAtom(isOkAtom);
  const { closeModal } = useModal();
  const [, setAccessToken] = useAtom(setAccessTokenAtom);
  const [, setRefreshToken] = useAtom(setRefreshTokenAtom);
  const router = useRouter();

  // 폼 값 변경 핸들러
  const onChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // 필드 리셋 핸들러
  const onClickResetButton = (field: keyof FormValues) => {
    setFormValues((prev) => ({ ...prev, [field]: '' }));
  };

  // 유효성 검사 함수
  const validateForm = (email: string, password: string): boolean => {
    try {
      formValueSchema.parse({ email, password });
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors[0];
        setErrors((prev) => ({ ...prev, [errors.path[0]]: errors.message }));
      }
      return false;
    }
  };

  // 로그인 처리 함수
  const signIn = async () => {
    setIsLoading((prev) => ({ ...prev, auth: true }));
    const email = formValues.email;
    const password = formValues.password;

    if (!validateForm(email, password)) {
      return;
    }

    try {
      const res = await loginAction(email, password);
      if (res.success && res.data) {
        setErrors({});
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);

        // 실제 토큰을 쿠키에 저장
        Cookies.set('accessToken', res.data.accessToken, { expires: 1, path: '/' });
        Cookies.set('refreshToken', res.data.refreshToken, { expires: 7, path: '/' });

        closeModal();
        toast.success('ITZIP에 오신것을 환영합니다.');

        router.push('/');
      } else {
        handleLoginError(email, password);
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, email: '서버 오류가 발생했습니다.' }));
    } finally {
      setIsLoading((prev) => ({ ...prev, auth: false }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading((prev) => ({ ...prev, submit: true }));

    try {
      await signIn();
    } catch (err) {
      console.error('로그인 오류:', err);
      setErrors({ email: '로그인에 실패했습니다.' });
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await logoutAction();

      // 쿠키 삭제
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('refresh test cookie');

      setAccessToken(null);
      setRefreshToken(null);

      router.push('/');
      closeModal();
    } catch (e) {
      console.error('로그아웃 실패:', e);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  // 로그인 오류 처리 함수
  const handleLoginError = (email: string, password: string) => {
    if (email.length > 1 && password.length > 1) {
      setErrors((prev) => ({ ...prev, email: '아이디 또는 비밀번호가 잘못 되었습니다.' }));
    } else if (password.length < 1) {
      setErrors((prev) => ({ ...prev, password: '비밀번호를 입력해주세요.' }));
    } else if (email.length < 1) {
      setErrors((prev) => ({ ...prev, email: '이메일을 입력해주세요.' }));
    }
  };

  return {
    formValues,
    errors,
    isLoading,
    isOk,
    handleSubmit,
    onClickResetButton,
    onChangeFormValues,
    logout,
  };
};

export default useSignIn;
