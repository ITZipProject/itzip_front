'use client';

import { redirect } from 'next/navigation';

import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { z } from 'zod';

import SmallAsk from '@/components/auth/smallAsk';
import Input from '@/components/common/input';
import { Margin } from '@/components/common/margin';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import { useModal } from '@/lib/context/ModalContext';

import Modal from '../auth/authModal';
import { useState } from 'react';
import axios from 'axios';
import Ask from '@/components/auth/ask';

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

  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  const handleReset = (field: keyof FormValues) => {
    setFormValues((prev) => ({ ...prev, [field]: '' }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
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
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/checkDuplicateEmail`, {
        params: { email: formValues.email },
      });

      setIsOk((prev) => ({
        ...prev,
        emailCheck: true,
      }));

      alert(res.status === 200 ? '사용 가능한 이메일입니다.' : '사용할 수 없는 이메일입니다.');
    } catch (err) {
      console.error('사용할 수 없는 이메일입니다.', err);
      alert('사용할 수 없는 이메일입니다.');
    } finally {
      setIsLoading(false);
    }
  };
  const postCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/authEmail`, {
        email: formValues.email,
      });

      if (res.status === 200) {
        alert('인증 코드가 이메일로 전송되었습니다.');
        setIsOk((prev) => ({ ...prev, postCode: true, codeCheck: true }));
      } else {
        alert('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
        setIsOk((prev) => ({ ...prev, codeCheck: false }));
      }
    } catch (err) {
      console.error('인증 코드 전송 중 오류 발생:', err);
      setErrors((prev) => ({
        ...prev,
        authCode: '인증 코드 전송에 실패했습니다. 다시 시도해주세요.',
      }));
    } finally {
      setIsLoading(false);
    }
  };
  const checkCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const encodedEmail = encodeURIComponent(formValues.email);
      const encodedAuthCode = encodeURIComponent(formValues.authCode);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/authEmail?email=${encodedEmail}&authCode=${encodedAuthCode}`,
      );

      if (res.status === 200) {
        // localStorage.setItem('authCode', formValues.authCode);
        setIsOk((prev) => ({
          ...prev,
          codeCheck: true,
          postCode: false,
        }));
        alert('인증이 완료되었습니다.');
      } else {
        throw new Error('인증 실패');
      }
    } catch (err) {
      console.error('인증 코드 확인 중 오류 발생:', err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          alert('인증번호가 올바르지 않습니다. 다시 확인해주세요.');
        } else {
          alert('인증 과정에서 오류가 발생했습니다. 다시 시도해 주세요.');
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
      }

      setIsOk((prev) => ({
        ...prev,
        codeCheck: false,
      }));
    } finally {
      setIsLoading(false);
    }
  };
  const signUp = async () => {
    setIsLoading(true);
    try {
      // 이메일 중복 체크
      const checkRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/checkDuplicateEmail`,
        {
          params: { email: formValues.email },
        },
      );

      if (checkRes.status !== 200) {
        throw new Error('이미 사용 중인 이메일입니다.');
      }

      // 회원가입 진행
      const joinRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/join`, {
        email: formValues.email,
        password: formValues.password,
        password_check: formValues.passwordConfirm,
        authCode: formValues.authCode,
      });

      if (joinRes.status === 201) {
        alert('회원가입에 성공했습니다!');
        setIsOk((prev) => ({ ...prev, codeCheck: true }));
        redirect('/profile');
      } else {
        throw new Error('회원가입 처리 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error('회원가입 중 오류 발생:', err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    } finally {
      setIsLoading(false);
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
      void signUp();
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
        <ChevronLeftIcon className="-ml-4 size-1/6" />
        <h1 className="text-2xl font-bold">이메일로 회원가입하기</h1>
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
        {/* <div hidden={!isOk.codeCheck}> */}
        <Input
          name="authCode"
          type="text"
          value={formValues.authCode}
          onChange={handleInputChange}
          placeholder="인증코드를 입력해주세요."
          errors={errors.authCode}
          onClick={() => handleReset('authCode')}
        />
        {/* </div> */}
        {!isOk.postCode ? (
          <button
            className="primary-btn bg-Grey-100 h-spacing-12 disabled:bg-Grey-100 disabled:text-white disabled:cursor-not-allowed rounded-radius-03 text-white font-semibold text-14"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              void postCode(e);
            }}
          >
            {isLoading ? '인증 코드 보내기 중..' : '인증 코드 보내기'}
          </button>
        ) : (
          <button
            className="primary-btn bg-Grey-100 h-spacing-12 disabled:bg-Grey-100 disabled:text-white disabled:cursor-not-allowed rounded-radius-03 text-white font-semibold text-14"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              void checkCode(e);
            }}
          >
            {isLoading ? '이메일 인증하기 중..' : '이메일 인증하기'}
          </button>
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
        <button
          onClick={signUp}
          className="primary-btn bg-Grey-100 h-spacing-12 disabled:bg-Grey-100 disabled:text-white disabled:cursor-not-allowed rounded-radius-03 text-white font-semibold text-14"
        >
          가입하기
        </button>
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
