'use client';

import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import React from 'react';
import { z } from 'zod';

import { errorsAtom, formValuesAtom, isOkAtom, loadingAtom } from '@/atoms/formAtoms'; // 상태 관리
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants'; // 상수
import { useModal } from '@/lib/context/ModalContext'; // 모달 컨텍스트
import { setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore'; // 토큰 저장
import { FormValues } from '@/types/auth'; // 폼 값 타입 정의
import { loginAction } from '@/api/auth/auth.action';
import { logoutAction } from '@/api/mypage/mypage.action';
import { useRouter } from 'next/navigation'; // 페이지 리디렉션

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
    .min(PASSWORD_MIN_LENGTH, `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR), // 비밀번호 규칙
});

const useSignIn = () => {
  const [formValues, setFormValues] = useAtom(formValuesAtom); // 폼 값 상태
  const [errors, setErrors] = useAtom(errorsAtom); // 오류 메시지 상태
  const [isLoading, setIsLoading] = useAtom(loadingAtom); // 로딩 상태
  const [isOk] = useAtom(isOkAtom); // 완료 여부
  const { closeModal } = useModal(); // 모달 관리
  const [, setAccessToken] = useAtom(setAccessTokenAtom); // 액세스 토큰 설정
  const [, setRefreshToken] = useAtom(setRefreshTokenAtom); // 리프레시 토큰 설정
  const router = useRouter(); // 페이지 리디렉션

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
      return true; // 유효성 검사 통과
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors[0];
        setErrors((prev) => ({ ...prev, [errors.path[0]]: errors.message })); // 첫 번째 오류 메시지 설정
      }
      return false; // 유효성 검사 실패
    }
  };

  // 로그인 처리 함수
  const signIn = async (formData: FormData) => {
    setIsLoading((prev) => ({ ...prev, auth: true })); // 로딩 상태 시작
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 유효성 검사
    if (!validateForm(email, password)) {
      return; // 유효성 검사 실패 시 반환
    }

    try {
      const res = await loginAction(formData); // 로그인 API 호출
      if (res.success && res.data) {
        setErrors({}); // 오류 초기화
        setAccessToken(res.data.accessToken); // 액세스 토큰 저장
        setRefreshToken(res.data.refreshToken); // 리프레시 토큰 저장

        closeModal(); // 로그인 성공 시 모달 닫기
        Cookies.set('accessToken', res.data.accessToken, { expires: 7, path: '/' });
        Cookies.set('refreshToken', res.data.refreshToken, { expires: 7, path: '/' });

        // 로그인 후 대시보드나 홈으로 리디렉션
        router.push('/'); // 필요에 따라 리디렉션 경로를 수정
      } else {
        handleLoginError(email, password); // 로그인 오류 처리
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, email: '서버 오류가 발생했습니다.' })); // 서버 오류 처리
    } finally {
      setIsLoading((prev) => ({ ...prev, auth: false })); // 로딩 상태 종료
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      const res = await logoutAction(); // 서버 로그아웃 호출
      console.log('로그아웃 성공:', res);

      // 쿠키 삭제
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('refresh test cookie'); // 필요에 따라 삭제할 쿠키 추가

      // Jotai 상태 초기화
      setAccessToken(null);
      setRefreshToken(null);

      // 리디렉션 (로그인 페이지로 이동)
      router.push('/'); // 로그인 페이지로 이동 (경로는 상황에 맞게 수정)

      // 모달 닫기 (필요에 따라 추가)
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
    signIn,
    onClickResetButton,
    onChangeFormValues,
    logout,
  };
};

export default useSignIn;
