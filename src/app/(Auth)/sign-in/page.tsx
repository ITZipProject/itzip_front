import Button from '@/components/common/button';
import Input from '@/components/common/input';
import SocialLogin from '@/components/social-login';
import React from 'react';

export default function SignIn() {
  return (
    <div className="flex flex-col items-center bg-slate-100  pt-40 h-screen w-full px-10">
      <h1 className='font-bold text-lg pb-4'>로그인</h1>
      <form className='w-full flex flex-col justify-center items-center gap-2 pb-4'>
        <Input name='email' type='email' placeholder='이메일' required  />
        <Input name='password' type='password' placeholder='비밀번호' required minLength={6}/>
        
      <div className='flex justify-end w-full'>비밀번호 찾기</div>
      
     <Button text="로그인"/>
      </form>
      <SocialLogin/>
    </div>
  );
}
