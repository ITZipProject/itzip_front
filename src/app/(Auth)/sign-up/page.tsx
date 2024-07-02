import Button from '@/components/common/button';
import Input from '@/components/common/input';
import SocialLogin from '@/components/social-login';
import React from 'react';

export default function SignUp() {
  return (
    <div className="flex flex-col items-center bg-slate-100  pt-40 h-screen w-full px-10">
      <h1 className="font-bold text-lg pb-4">회원가입</h1>
      <form className="w-full flex flex-col justify-center items-center gap-2 pb-4">
        <Input name="email" type="email" placeholder="이메일" required />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          minLength={6}
        />
        <Input
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          required
          minLength={6}
        />
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <span>[필수] OOO 이용약관</span>
            <input type="checkbox" />
          </div>
          <div className="flex items-center gap-2">
            <span>[필수] 개인정보 수집 및 이용</span>
            <input type="checkbox" />
          </div>
        </div>
        <Button text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
