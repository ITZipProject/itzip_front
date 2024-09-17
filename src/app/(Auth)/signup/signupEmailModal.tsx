'use client';

import React, { useEffect, useState } from 'react';
import Modal from '../auth/authModal';
import Input from '../../../components/common/input';
import Button from '../auth/authButton';
import { useModal } from '@/lib/context/ModalContext';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Margin } from '@/components/common/margin';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import Ask from '@/components/auth/ask';
import SmallAsk from '@/components/auth/smallAsk';

interface SignInModalProps {
  modalId: string;
}
interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  authCode: string;
}

const SignUpEmailModal: React.FC<SignInModalProps> = ({ modalId }) => {
  const { openModals, closeModal, openModal } = useModal();
  const { pending } = useFormStatus();
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    passwordConfirm: '',
    authCode: '',
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({
    email: '',
    password: '',
    passwordConfirm: '',
    authCode: '',
  });
  const [allChecked, setAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOk, setIsOk] = useState({
    emailCheck: false, // 이메일 중복 체크
    postCode: false, // 인증 코드 보내기
    codeCheck: false, // 코드 인증 완료
  });
  const [isChecked, setIsChecked] = useState({
    private: false,
    service: false,
  });

  useEffect(() => {
    console.log('code____', formValues.authCode);
  }, [formValues.authCode]);
  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  const handleReset = (field: 'email' | 'password' | 'passwordConfirm' | 'authCode') => {
    if (field === 'email') {
      setFormValues((prev) => ({
        ...prev,
        email: '',
      }));
    } else if (field === 'password') {
      setFormValues((prev) => ({
        ...prev,
        password: '',
      }));
    } else if (field === 'passwordConfirm') {
      setFormValues((prev) => ({
        ...prev,
        passwordConfirm: '',
      }));
    } else if (field === 'authCode') {
      setFormValues((prev) => ({
        ...prev,
        authCode: '',
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setFormValues((prev) => ({
        ...prev,
        email: value,
      }));
    } else if (name === 'password') {
      setFormValues((prev) => ({
        ...prev,
        password: value,
      }));
    } else if (name === 'passwordConfirm') {
      setFormValues((prev) => ({
        ...prev,
        passwordConfirm: value,
      }));
    } else if (name === 'authCode') {
      setFormValues((prev) => ({
        ...prev,
        authCode: value,
      }));
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
  const formSchema = z.object({
    email: z.string().email('유효한 이메일 주소를 입력해주세요.').toLowerCase(),

    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `비밀번호 확인는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`),
    authCode: z.string(),
  });

  const emailCheck = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/checkDuplicateEmail`, {
        params: {
          email: formValues.email,
        },
      });
      if (res.status === 200) {
        setIsOk((prev) => ({
          ...prev,
          emailCheck: !isOk.emailCheck,
        }));
        alert('사용 가능한 이메일입니다.');
      }
      if (res.status === 400) {
        setIsOk((prev) => ({
          ...prev,
          emailCheck: !isOk.emailCheck,
        }));
        alert('사용할 수 없는 이메일입니다.');
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const postCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // api 배포 되면 재구성 인코딩 or 디코딩

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/authEmail`, {
        email: formValues.email,
      });
      console.log(res.data);
      if (res.status === 200) {
        alert('인증 코드가 이메일로 전송되었습니다.');
        setIsOk((prev) => ({
          ...prev,
          postCode: false,
        }));
        console.log('인증 코드가 이메일로 전송되었습니다.', isOk.codeCheck);
      }
      if (res.status === 400) {
        alert('인증 코드 보내기 실패');
        setIsOk((prev) => ({
          ...prev,
          codeCheck: !isOk.codeCheck,
        }));
        console.log('요청값이 올바르지 않습니다.');
      }
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        authCode: '인증 코드 전송에 실패했습니다. 다시 시도해주세요.',
      }));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const checkCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/authEmail`, {
        params: {
          email: formValues.email,
          authCode: formValues.authCode,
        },
      });

      if (res.status === 200) {
        console.log('코드 인증 성공!');
        localStorage.setItem('authCode', formValues.authCode);
        setIsOk((prev) => ({
          ...prev,
          postCode: !isOk.postCode,
        }));
        alert('인증이 완료되었습니다.');
      }
      if (res.status === 400) {
        console.log('코드 인증 실패');
        setIsOk((prev) => ({
          ...prev,
          postCode: true,
          codeCheck: true,
        }));
        alert('인증번호를 다시 한 번 확인해주세요.');
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const signUp = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/join`, {
        email: formValues.email,
        password: formValues.password,
        password_check: formValues.passwordConfirm,
        authCode: formValues.authCode,
      });
      if (res.status === 201) {
        console.log('회원가입 성공!');
        setIsOk({
          ...isOk,
          codeCheck: !isOk.codeCheck,
        });
      }
      if (res.status === 400) {
        console.log('회원가입 실패');
        setIsOk({
          ...isOk,
          codeCheck: false,
        });
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
      redirect('/profile');
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      formSchema.parse(formValues);

      if (formValues.password !== formValues.passwordConfirm) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: '비밀번호가 일치하지 않습니다.',
        }));
        return;
      }
      setErrors({ email: '', password: '', passwordConfirm: '', authCode: '' });
      console.log('success');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = { email: '', password: '', passwordConfirm: '', authCode: '' };
        error.errors.forEach((err) => {
          newErrors[err.path[0] as keyof FormValues] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };
  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)}>
      <button onClick={() => openModal('signUpModal')} className="flex items-center">
        <ChevronLeftIcon className="size-1/6 -ml-4" />
        <h1 className="font-[700] text-[24px]">이메일로 회원가입하기</h1>
      </button>
      <Margin height={'48px'} />
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="flex items-center">
          <label htmlFor="email">이메일</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
          placeholder="ID@example.com"
          required
          minLength={2}
          onClick={() => handleReset('email')}
          errors={errors.email}
        />
        {/* <Button text="이메일 인증하기" modalId="" /> */}
        {!isOk.postCode ? (
          <button
            className="primary-btn bg-[#F5F5F5] h-[48px] disabled:bg-[#F5F5F5]disabled:text-white disabled:cursor-not-allowed rounded-[12px] text-white font-[600] text-[14px]"
            disabled={isLoading}
            onClick={postCode}
          >
            {isLoading ? '인증 코드 보내는 중..' : '인증 코드 보내기'}
          </button>
        ) : (
          <>
            <div hidden={isOk.codeCheck}>
              <Input
                name="authCode"
                type="text"
                placeholder="인증코드를 입력해주세요."
                errors={errors.authCode}
              />
            </div>
            {!isOk.postCode ? (
              <button
                className="primary-btn bg-[#F5F5F5] h-[48px] disabled:bg-[#F5F5F5]disabled:text-white disabled:cursor-not-allowed rounded-[12px] text-white font-[600] text-[14px]"
                disabled={isLoading}
                type="button"
                onClick={postCode}
              >
                인증 코드 보내기
              </button>
            ) : !isOk.postCode ? (
              <button
                className="primary-btn bg-[#F5F5F5] h-[48px] disabled:bg-[#F5F5F5]disabled:text-white disabled:cursor-not-allowed rounded-[12px] text-white font-[600] text-[14px]"
                onClick={checkCode}
              >
                이메일 인증하기
              </button>
            ) : (
              <span className="flex justify-center">이메일 인증완료</span>
            )}
          </>
        )}
        <div className="flex items-center">
          <label htmlFor="password">비밀번호</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formValues.password}
          onChange={handleInputChange}
          required
          minLength={2}
          onClick={() => handleReset('password')}
          errors={errors.password}
        />
        <div className="flex items-center">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formValues.passwordConfirm}
          onChange={handleInputChange}
          required
          minLength={2}
          onClick={() => handleReset('passwordConfirm')}
          errors={errors.passwordConfirm}
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
        {/* <Button text="가입하기" modalId="" /> */}

        <div className="flex flex-col items-center">
          <SmallAsk text="이미 회원이신가요?" textColor="#818181" />
          <Ask text="회원가입하기" textColor="#0500E8" modalName="verifyModal" />
        </div>
      </form>
    </Modal>
  );
};

export default SignUpEmailModal;
