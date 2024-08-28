import EmailLoginModal from '@/app/(Auth)/email/emailLoginModal';
import LoginModal from '@/app/(Auth)/login/loginModal';
import SignUpModal from '@/app/(Auth)/signup/signUpModal';
import SignUpEmailModal from '@/app/(Auth)/signup/signupEmailModal';
import VerifyModal from '@/app/(Auth)/verifyModal';

export const Modals = () => {
  return (
    <>
      <LoginModal modalId="LoginModal" />
      <EmailLoginModal modalId="EmailLoginModal" />
      <SignUpModal modalId="signUpModal" />
      <SignUpEmailModal modalId="signUpEmailModal" />
      <VerifyModal modalId="verifyModal" />
    </>
  );
};
