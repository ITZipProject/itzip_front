'use client';

import Button from '@/components/common/button';
import Input from '@/components/common/input';

import React from 'react';
import { useFormState } from 'react-dom';
import { signUp } from './actions';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import Link from 'next/link';

export default function SignUp() {
  const [state, dispatch] = useFormState(signUp, null);
  return (
    <div className="flex flex-col items-center bg-slate-100  pt-40 h-screen w-full px-10">
      <h1 className="font-bold text-lg pb-4">회원가입</h1>
      <form
        action={dispatch}
        className="w-full flex flex-col justify-center items-center gap-2 pb-4"
      >
        <Input
          name="nickname"
          type="text"
          placeholder="닉네임"
          required
          errors={state?.fieldErrors.nickname}
          minLength={2}
        />
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Input
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.passwordConfirm}
        />
        <div className="flex gap-8 items-center my-2">
          <div className="flex items-center gap-2 ">
            <span>[필수] OOO 이용약관</span>
            <input type="checkbox" />
          </div>
          <div className="flex items-center gap-2 ">
            <span>[필수] 개인정보 수집 및 이용</span>
            <input type="checkbox" />
          </div>
        </div>

        <Button text="회원가입" modalId={''} />
      </form>
      <div className="flex gap-2 my-2">
        <span>이미 계정이 있어요!</span>
        <Link href="/sign-in" className="hover:underline underline-offset-4">
          로그인
        </Link>
      </div>
    </div>
  );
}
