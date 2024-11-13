'use client';

import ModalBackButton from '@/components/auth/modalBackButton';
import Input from '@/components/common/input';
import { Margin } from '@/components/common/margin';
import Modal from '@/components/portal/modal';
import useSignIn from '@/hooks/auth/useSignIn';
import { useModal } from '@/lib/context/ModalContext';

import { AuthButton } from '../auth/authButton';

interface SignInModalProps {
  modalId: string;
}

const EmailLoginModal: React.FC<SignInModalProps> = ({ modalId }: SignInModalProps) => {
  const { openModals, closeModal } = useModal();
  const { isLoading, formValues, signIn, onChangeFormValues, onClickResetButton, errors } =
    useSignIn();

  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  return (
    <Modal isOpen={true} onClose={() => closeModal()}>
      <ModalBackButton title="이메일로 로그인하기" />
      <Margin height={'48px'} />
      <form noValidate action={signIn as unknown as string} className="w-full space-y-4">
        <Input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          labelTitle="email"
          title="이메일"
          onChange={onChangeFormValues}
          placeholder="ID@example.com"
          required
          minLength={2}
          onClick={() => onClickResetButton('email')}
          errors={errors.email}
        />

        <Input
          id="password"
          name="password"
          type="password"
          labelTitle="password"
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={formValues.password}
          onChange={onChangeFormValues}
          required
          minLength={2}
          onClick={() => onClickResetButton('password')}
          errors={errors.password}
        />

        <AuthButton disabled={isLoading.join}>로그인하기</AuthButton>
      </form>
    </Modal>
  );
};

export default EmailLoginModal;
