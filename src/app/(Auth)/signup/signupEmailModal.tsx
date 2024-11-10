'use client';

import { XCircleIcon } from '@heroicons/react/16/solid';
import { useAtom } from 'jotai';

import { agreeErrorAtom } from '@/atoms/formAtoms';
import AgreeCheckboxes from '@/components/auth/agreeCheckbox';
import ModalBackButton from '@/components/auth/modalBackButton';
import SmallAsk from '@/components/auth/smallAsk';
import Input from '@/components/common/input';
import { Margin } from '@/components/common/margin';
import Modal from '@/components/portal/modal';
import { useSignUp } from '@/hooks/useSignUp';
import { useModal } from '@/lib/context/ModalContext';

import { AuthButton } from '../auth/authButton';

interface SignInModalProps {
  modalId: string;
}
const SignUpEmailModal: React.FC<SignInModalProps> = ({ modalId }: SignInModalProps) => {
  const { openModals, closeModal } = useModal();
  const {
    formValues,
    errors,
    message,
    isLoading,
    isOk,
    onClickResetButton,
    onChangeFormValues,
    checkEmailDuplicate,
    sendAuthCode,
    verifyAuthCode,
    signUp,
  } = useSignUp();
  const [agreeError] = useAtom(agreeErrorAtom);

  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <ModalBackButton title="이메일로 회원가입하기" />
      <Margin height={'48px'} />
      <form
        onSubmit={(e) => {
          void signUp(e);
        }}
        className="w-full space-y-4"
        noValidate
      >
        <Input
          id="email"
          name="email"
          type="email"
          labelTitle="email"
          title="이메일"
          value={formValues.email}
          onChange={onChangeFormValues}
          placeholder="ID@example.com"
          required
          minLength={2}
          onClick={() => onClickResetButton('email')}
          errors={errors.email}
          messages={message.email}
        />

        {!isOk.emailCheck ? (
          <AuthButton
            disabled={isLoading.emailCheck}
            onClick={() => {
              void checkEmailDuplicate();
            }}
          >
            {isLoading.emailCheck ? '중복 확인 중..' : '중복 확인하기'}
          </AuthButton>
        ) : (
          <>
            {isOk.codeHidden && (
              <Input
                name="authCode"
                type="text"
                labelTitle="authCode"
                title="인증코드"
                value={formValues.authCode}
                onChange={onChangeFormValues}
                placeholder="인증코드를 입력해주세요."
                errors={errors.authCode}
                messages={message.authCode}
                onClick={() => onClickResetButton('authCode')}
              />
            )}
            {!isOk.codePost ? (
              <AuthButton
                disabled={isLoading.codePost}
                onClick={() => {
                  void sendAuthCode();
                }}
              >
                {isLoading.codePost ? '인증 코드 보내기 중..' : '인증 코드 보내기'}
              </AuthButton>
            ) : (
              <>
                {!isOk.codeVerify && (
                  <>
                    <AuthButton
                      disabled={isLoading.codeVerify}
                      onClick={() => {
                        void verifyAuthCode();
                      }}
                    >
                      {isLoading.codeVerify ? '인증코드 확인 중..' : '인증코드 확인하기'}
                    </AuthButton>
                    <AuthButton
                      disabled={isLoading.codePost}
                      onClick={() => {
                        void sendAuthCode();
                      }}
                    >
                      {isLoading.codePost ? '인증 코드 보내기 중..' : '인증 코드 다시 보내기'}
                    </AuthButton>
                  </>
                )}
              </>
            )}
          </>
        )}

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
          onClick={() => onClickResetButton('password')}
          errors={errors.password}
          messages={message.password}
        />

        <Input
          id="passwordCheck"
          name="passwordCheck"
          labelTitle="passwordCheck"
          title="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formValues.passwordCheck}
          onChange={onChangeFormValues}
          required
          minLength={2}
          onClick={() => onClickResetButton('passwordCheck')}
          errors={errors.passwordCheck}
          messages={message.passwordCheck}
        />
        {/* 약관 동의 체크박스 */}
        <AgreeCheckboxes />
        {agreeError && (
          <span className="text-12 font-[500] text-color-text-warning">
            <div className="mt-2 flex items-center gap-[4.5px]">
              <XCircleIcon className="size-[19px]" />
              {agreeError}
            </div>
          </span>
        )}
        {/* 가입하기 버튼 */}
        <AuthButton disabled={isLoading.signUp}>가입하기</AuthButton>

        <div className="flex flex-col items-center">
          <SmallAsk text="이미 회원이신가요?" textColor="#818181" />
        </div>
      </form>
    </Modal>
  );
};

export default SignUpEmailModal;
