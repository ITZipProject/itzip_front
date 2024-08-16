import EmailLoginModal from '@/app/components/auth/email/emailLoginModal';
import LoginModal from '@/app/components/auth/login/loginModal';
import SignUpModal from '@/app/components/auth/signup/signUpModal';
import SignUpEmailModal from '@/app/components/auth/signup/signupEmailModal';

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
