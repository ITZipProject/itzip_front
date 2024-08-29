'use client';

import React, { useState } from 'react';
import Modal from '../auth/authModal';
import Input from '../../../components/common/input';
import Button from '../auth/authButton';
import { useModal } from '@/lib/context/ModalContext';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Margin } from '@/components/common/margin';
import axios from 'axios';
import { redirect } from 'next/navigation';

interface SignInModalProps {
  modalId: string;
}

const SignUpEmailModal: React.FC<SignInModalProps> = ({ modalId }) => {
  const { openModals, closeModal, openModal } = useModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [ErrorText, setErrorText] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [isChecked, setIsChecked] = useState({
    private: false,
    service: false,
  });

  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  const handleReset = (field: 'email' | 'password' | 'confirmPassword' | 'code') => {
    if (field === 'email') {
      setEmail('');
    } else if (field === 'password') {
      setPassword('');
    } else if (field === 'confirmPassword') {
      setConfirmPassword('');
    } else if (field === 'code') {
      setCode('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name === 'code') {
      setCode(value);
    }
  };

  const handleAllCheckedChange = () => {
    const newCheckedStatus = !allChecked;
    setAllChecked(newCheckedStatus);
    setIsChecked({
      service: newCheckedStatus,
      private: newCheckedStatus,
    });
  };

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setIsChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (!checked) {
      setAllChecked(false);
    } else {
      setAllChecked(
        Object.values({
          ...isChecked,
          [name]: checked,
        }).every(Boolean),
      );
    }
  };

  const handleEmailCheck = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/checkDuplicateEmail`);
      console.log(res.data);
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleVerifyCode = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/authEmail`, {
        email,
      });
      console.log(res.data);
      if (res.status === 200) {
        setIsOk(true);
        alert('인증 코드가 이메일로 전송되었습니다.');
        console.log('인증 코드가 이메일로 전송되었습니다.');
      }
      if (res.status === 400) {
        setIsOk(false);
        alert('요청값이 올바르지 않습니다.');
        console.log('요청값이 올바르지 않습니다.');
      }
    } catch (err: any) {
      setErrorText('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const signUp = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/join`, {
        email,
        password,
        password_check: confirmPassword,
        auth_code: code,
      });
      if (res.status === 201) {
        setIsOk(true);
        console.log('리소스가 성공적으로 생성되었습니다.');
      }
      if (res.status === 400) {
        setIsOk(false);
        console.log('요청값이 올바르지 않습니다.');
      }
    } catch (err: any) {
      setErrorText('다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
      redirect('/profile');
    }
  };
  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)}>
      <button onClick={() => openModal('signUpModal')} className="flex items-center">
        <ChevronLeftIcon className="size-1/6 -ml-4" />
        <h1 className="font-[700] text-[24px]">이메일로 회원가입하기</h1>
      </button>
      <Margin height={'48px'} />
      <form className="w-full space-y-4">
        <div className="flex items-center">
          <label htmlFor="email">이메일</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="ID@example.com"
          required
          minLength={2}
          onClick={() => handleReset('email')}
        />
        <Input name="code" type="text" placeholder="인증코드를 입력해주세요." errors={ErrorText} />

        <Button text="이메일 인증하기" modalId="" />

        <div className="flex items-center">
          <label htmlFor="password">비밀번호</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={handleInputChange}
          required
          minLength={2}
          onClick={() => handleReset('password')}
        />
        <div className="flex items-center">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={confirmPassword}
          onChange={handleInputChange}
          required
          minLength={2}
          onClick={() => handleReset('confirmPassword')}
        />
        {/* 약관 동의 체크박스 */}
        <div className="*:p-[12px]">
          <div>
            <input
              id="all"
              type="checkbox"
              checked={allChecked}
              onChange={handleAllCheckedChange}
              className="size-[16px] border border-[##C6C6C6] outline-none ring-0"
            />
            <label htmlFor="all" className="ml-[9px] text-[#8F8F8F]">
              다음 약관에 모두 동의합니다.
            </label>
          </div>
          <div>
            <input
              id="service"
              type="checkbox"
              name="service"
              checked={isChecked.service}
              onChange={handleAgreeChange}
              required
              className="size-[16px] border border-[##C6C6C6] outline-none ring-0"
            />
            <label htmlFor="service" className="ml-[9px] text-[#8F8F8F]">
              <span>(필수)</span>
              <span> ITZIP 이용약관</span>
              <span>에 동의합니다</span>
            </label>
          </div>
          <div>
            <input
              id="private"
              type="checkbox"
              name="private"
              checked={isChecked.private}
              onChange={handleAgreeChange}
              required
              className="size-[16px] border border-[##C6C6C6] outline-none ring-0 "
            />
            <label htmlFor="private" className="ml-[9px] text-[#8F8F8F]">
              <span>(필수)</span>
              <span> 개인정보 수집 및 이용</span>
              <span>에 동의합니다</span>
            </label>
          </div>
        </div>

        {/* 가입하기 버튼 */}
        <span onClick={signUp}>
          <Button text="가입하기" modalId="" />
        </span>
        <Button text="가입하기" modalId="" />

        <div className="flex flex-col items-center">
          <h1 className="text-[12px] font-[500] text-[#818181]">이미 회원이신가요?</h1>
          <button
            onClick={() => openModal('verifyModal')}
            className="my-[16px] text-[#0500E8] hover:underline underline-offset-4"
          >
            로그인하기
          </button>
        </div>
      </form>
      {isLoading ? 'Loading..' : <button onClick={handleEmailCheck}>이메일 중복확인</button>}
      {isLoading ? 'Loading..' : <button onClick={handleVerifyCode}>이메일 인증하기</button>}
    </Modal>
  );
};

export default SignUpEmailModal;
