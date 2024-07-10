'use client';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import SocialLogin from '@/components/auth/social-login';
import React from 'react';
import { useFormState } from 'react-dom';
import { login } from './action';
import { PASSWORD_MIN_LENGTH } from '@/app/lib/constants';
import Link from 'next/link';

export default function SignIn() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="flex flex-col items-center bg-slate-100  pt-40 h-screen w-full px-10">
      <h1 className="font-bold text-lg pb-4">로그인</h1>
      <form
        action={dispatch}
        className="w-full flex flex-col justify-center items-center gap-2 pb-4"
      >
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

        <div className="flex justify-end w-full">비밀번호 찾기</div>

        <Button text="로그인" />
      </form>
      <div className="flex gap-2 my-4">
        <span>계정이 없어요!</span>
        <Link href="/sign-up" className="hover:underline underline-offset-4">
          회원가입
        </Link>
      </div>
      <SocialLogin />
    </div>
  );
}
