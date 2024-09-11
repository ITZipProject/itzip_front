'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Modal from '../auth/authModal';
import Input from '../../../components/common/input';
import Button from '../auth/authButton';
import { useModal } from '@/lib/context/ModalContext';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Margin } from '@/components/common/margin';

interface SignInModalProps {
  modalId: string;
}

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  private: boolean;
  service: boolean;
}

const SignUpEmailModal: React.FC<SignInModalProps> = ({ modalId }) => {
  const { openModals, closeModal, openModal } = useModal();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      private: false,
      service: false,
    },
  });

  const [allChecked, setAllChecked] = useState(false);

  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  const onSubmit = (data: FormValues) => {
    console.log(data);
    
    // TODO: 회원가입 로직 추가
    closeModal(modalId);
  };

  const handleAllCheckedChange = () => {
    const newCheckedStatus = !allChecked;
    setAllChecked(newCheckedStatus);
    setValue('private', newCheckedStatus);
    setValue('service', newCheckedStatus);
  };

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValue(name as keyof FormValues, checked);
    if (!checked) {
      setAllChecked(false);
    } else {
      setAllChecked(['private', 'service'].every((key) => watch(key as any)));
    }
  };

  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)}>
      <button onClick={() => openModal('signUpModal')} className="flex items-center">
        <ChevronLeftIcon className="size-1/6 -ml-4" />
        <h1 className="font-[700] text-[24px]">이메일로 회원가입하기</h1>
      </button>
      <Margin height={'48px'} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex items-center">
          <label htmlFor="email">이메일</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Controller
          name="email"
          control={control}
          rules={{
            required: '이메일은 필수입니다.',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: '유효한 이메일 주소를 입력하세요.',
            },
          }}
          render={({ field }) => (
            <Input
              id="email"
              type="email"
              placeholder="ID@example.com"
              {...field}
              onClick={() => setValue('email', '')}
              errors={errors.email?.message}
            />
          )}
        />
        <Button text="이메일 인증하기" modalId="" />

        <div className="flex items-center">
          <label htmlFor="password">비밀번호</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Controller
          name="password"
          control={control}
          rules={{
            required: '비밀번호는 필수입니다.',
            minLength: {
              value: 6,
              message: '비밀번호는 최소 6자 이상이어야 합니다.',
            },
          }}
          render={({ field }) => (
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...field}
              onClick={() => setValue('password', '')}
              errors={errors.password?.message}
            />
          )}
        />
        <div className="flex items-center">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: '비밀번호 확인은 필수입니다.',
            validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
          }}
          render={({ field }) => (
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...field}
              onClick={() => setValue('confirmPassword', '')}
              errors={errors.confirmPassword?.message}
            />
          )}
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
              checked={watch('service')}
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
              checked={watch('private')}
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
    </Modal>
  );
};

export default SignUpEmailModal;
