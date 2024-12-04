import EmailLoginModal from '@/app/(Auth)/email/emailLoginModal';
import LoginModal from '@/app/(Auth)/login/loginModal';
import SignUpEmailModal from '@/app/(Auth)/signup/signupEmailModal';
import SignUpModal from '@/app/(Auth)/signup/signUpModal';

export const Modals = () => {
  return (
    <>
      <LoginModal modalId="LoginModal" />
      <EmailLoginModal modalId="EmailLoginModal" />
      <SignUpModal modalId="signUpModal" />
      <SignUpEmailModal modalId="signUpEmailModal" />
    </>
  );
};
