'use client';

import { ChevronLeftIcon, XCircleIcon } from '@heroicons/react/16/solid';

import SmallAsk from '@/components/auth/smallAsk';
import Input from '@/components/common/input';
import { Margin } from '@/components/common/margin';
import { useModal } from '@/lib/context/ModalContext';

import Modal from '../auth/authModal';
import Ask from '@/components/auth/ask';
import { useAtom } from 'jotai';

import AgreeCheckboxes from '@/components/auth/agreeCheckbox';
import { SignInModalProps } from '@/types/modal';
import { useSignUp } from '@/hooks/auth';
import { agreeErrorAtom } from '@/atoms/formAtoms';
import { AuthButton } from '../auth/authButton';

const SignUpEmailModal: React.FC<SignInModalProps> = ({ modalId }) => {
  const { openModals, closeModal, openModal } = useModal();
  const {
    formValues,
    errors,
    isLoading,
    isOk,
    onClickResetButton,
    onChangeFormValues,
    checkEmailDuplicate,
    sendAuthCode,
    verifyAuthCode,
    onSubmitSignUpButton,
    signUp,
  } = useSignUp();
  const [agreeError] = useAtom(agreeErrorAtom);

  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)}>
      <button onClick={() => openModal('signUpModal')} className="flex items-center">
        <ChevronLeftIcon className="-ml-4 size-1/6" />
        <h1 className="text-2xl font-bold">이메일로 회원가입하기</h1>
      </button>
      <Margin height={'48px'} />
      {/* 임시로 signUp 사용 - 이유 onSubmitSignUpBtn은 로그인 검증 로직인데 검증은 되는데 회원가입이 되지 않음. */}
      <form onSubmit={signUp} className="w-full space-y-4" noValidate>
        <div className="flex items-center">
          <label htmlFor="email">이메일</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={onChangeFormValues}
          placeholder="ID@example.com"
          required
          minLength={2}
          onClick={() => onClickResetButton('email')}
          errors={errors.email}
        />
        {!isOk.emailCheck && (
          <AuthButton
            disabled={isLoading.emailCheck}
            onClick={(e) => {
              e.preventDefault();
              void checkEmailDuplicate(e);
            }}
          >
            {isLoading.emailCheck ? '중복 확인 중..' : '중복 확인하기'}
          </AuthButton>
        )}
        {isOk.emailCheck && (
          <>
            <div hidden={!isOk.codeHidden}>
              <Input
                name="authCode"
                type="text"
                value={formValues.authCode}
                onChange={onChangeFormValues}
                placeholder="인증코드를 입력해주세요."
                errors={errors.authCode}
                onClick={() => onClickResetButton('authCode')}
              />
            </div>
            {!isOk.codePost ? (
              <AuthButton
                disabled={isLoading.codePost}
                onClick={(e) => {
                  e.preventDefault();
                  void sendAuthCode(e);
                }}
              >
                {isLoading.codePost ? '인증 코드 보내기 중..' : '인증 코드 보내기'}
              </AuthButton>
            ) : !isOk.codeVerify ? (
              <>
                <AuthButton
                  disabled={isLoading.codeVerify}
                  onClick={(e) => {
                    e.preventDefault();
                    void verifyAuthCode(e);
                  }}
                >
                  {isLoading.codeVerify ? '이메일 인증하기 중..' : '이메일 인증하기'}
                </AuthButton>
                <AuthButton
                  disabled={isLoading.codePost}
                  onClick={(e) => {
                    e.preventDefault();
                    void sendAuthCode(e);
                  }}
                >
                  {isLoading.codePost ? '인증 코드 보내기 중..' : '인증 코드 다시 보내기'}
                </AuthButton>
              </>
            ) : (
              <span className="flex justify-center w-full">인증완료</span>
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
          onChange={onChangeFormValues}
          required
          onClick={() => onClickResetButton('password')}
          errors={errors.password}
        />
        <div className="flex items-center">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <span className="text-[#E46969] ml-[2px]">*</span>
        </div>
        <Input
          id="passwordCheck"
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formValues.passwordCheck}
          onChange={onChangeFormValues}
          required
          minLength={2}
          onClick={() => onClickResetButton('passwordCheck')}
          errors={errors.passwordCheck}
        />
        {/* 약관 동의 체크박스 */}
        <AgreeCheckboxes />
        {agreeError && (
          <span className="text-color-text-warning text-[12px] font-[500]">
            <div className="flex items-center gap-[4.5px] mt-2">
              <XCircleIcon className="size-[19px]" />
              {agreeError}
            </div>
          </span>
        )}
        {/* 가입하기 버튼 */}
        <button className="primary-btn bg-Grey-100 h-spacing-12 disabled:bg-Grey-100 disabled:text-white disabled:cursor-not-allowed rounded-radius-03 text-white font-semibold text-14">
          가입하기
        </button>

        <div className="flex flex-col items-center">
          <SmallAsk text="이미 회원이신가요?" textColor="#818181" />
          <Ask text="회원가입하기" textColor="#0500E8" modalName="verifyModal" />
        </div>
      </form>
    </Modal>
  );
};

export default SignUpEmailModal;
