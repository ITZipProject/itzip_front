'use client';

import { XCircleIcon } from '@heroicons/react/16/solid';
import { useAtom } from 'jotai';

import { agreeErrorAtom } from '@/atoms/formAtoms';
import AgreeCheckboxes from '@/components/auth/agreeCheckbox';
import ModalBackButton from '@/components/auth/modalBackButton';
import SmallAsk from '@/components/auth/smallAsk';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/input';
import { Margin } from '@/components/common/margin';
import Modal from '@/components/portal/modal';
import { useSignUp } from '@/hooks/auth/useSignUp';
import { useModal } from '@/lib/context/ModalContext';

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

  if (!openModals.includes(modalId)) return null;

  return (
    <Modal isOpen={true} onClose={() => closeModal()}>
      <ModalBackButton title="이메일로 회원가입하기" />
      <Margin height={'48px'} />
      <form
        onSubmit={(e) => {
          void signUp(e); // 회원가입 실행
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
          <Button
            variant="basedButton"
            loading={isLoading.emailCheck}
            onClick={() => {
              void checkEmailDuplicate(); // 이메일 중복 확인
            }}
          >
            중복 확인하기
          </Button>
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
              <Button
                variant="basedButton"
                loading={isLoading.codePost}
                onClick={() => {
                  void sendAuthCode(); // 인증 코드 전송
                }}
              >
                인증 코드 보내기
              </Button>
            ) : (
              <>
                {!isOk.codeVerify && (
                  <>
                    <Button
                      variant="basedButton"
                      loading={isLoading.codeVerify}
                      onClick={() => {
                        void verifyAuthCode(); // 인증 코드 확인
                      }}
                    >
                      인증코드 확인하기
                    </Button>
                    <Button
                      variant="basedButton"
                      loading={isLoading.codePost}
                      onClick={() => {
                        void sendAuthCode(); // 인증 코드 다시 보내기
                      }}
                    >
                      인증 코드 다시 보내기
                    </Button>
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

        <AgreeCheckboxes />
        {agreeError && (
          <span className="text-12 font-[500] text-color-text-warning">
            <div className="mt-2 flex items-center gap-[4.5px]">
              <XCircleIcon className="size-[19px]" />
              {agreeError}
            </div>
          </span>
        )}

        <Button variant="basedButton">가입하기</Button>

        <div className="flex flex-col items-center">
          <SmallAsk text="이미 회원이신가요?" modalName="LoginModal" />
        </div>
      </form>
    </Modal>
  );
};

export default SignUpEmailModal;
