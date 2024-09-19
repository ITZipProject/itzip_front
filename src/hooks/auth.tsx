import {
  errorsAtom,
  formValuesAtom,
  isOkAtom,
  loadingAtom,
  agreeAtom,
  agreeErrorAtom,
} from '@/atoms/formAtoms';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import { FormValues } from '@/types/auth';
import axios from 'axios';
import { useAtom } from 'jotai';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const useSignUp = () => {
  const [formValues, setFormValues] = useAtom(formValuesAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [isOk, setIsOk] = useAtom(isOkAtom);
  const [isChecked] = useAtom(agreeAtom);
  const [, setAgreeError] = useAtom(agreeErrorAtom);

  const onClickResetButton = (field: keyof FormValues) => {
    setFormValues((prev) => ({ ...prev, [field]: '' }));
  };

  const onChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, '이메일을 입력해주세요.')
        .email('올바른 이메일 형식이 아닙니다.')
        .toLowerCase(),
      password: z
        .string()
        .min(1, '비밀번호를 입력해주세요.')
        .min(PASSWORD_MIN_LENGTH, `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`)
        .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
      passwordCheck: z
        .string()
        .min(1, '비밀번호 확인을 입력해주세요.')
        .min(
          PASSWORD_MIN_LENGTH,
          `비밀번호 확인는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
        ),
      authCode: z.string().min(1, '인증 코드를 입력해주세요.'),
      agreeTerms: z.boolean(),
    })
    .refine((data) => data.password === data.passwordCheck, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['passwordCheck'],
    })
    .refine((data) => data.agreeTerms === true, {
      message: '약관에 모두 동의해야 합니다.',
      path: ['agreeTerms'],
    });

  const checkEmailDuplicate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, emailCheck: true }));

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/checkDuplicateEmail`, {
        params: { email: formValues.email },
      });

      const isEmailAvailable = res.status === 200;
      setIsOk((prev) => ({
        ...prev,
        emailCheck: isEmailAvailable,
        codeHidden: isEmailAvailable,
      }));

      alert(isEmailAvailable ? '사용 가능한 이메일입니다.' : '사용할 수 없는 이메일입니다.');
    } catch (err) {
      setIsOk((prev) => ({ ...prev, emailCheck: false, codeHidden: false }));
      alert('사용할 수 없는 이메일입니다.');
    } finally {
      setIsLoading((prev) => ({ ...prev, emailCheck: false }));
    }
  };
  const sendAuthCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({
      ...prev,
      codePost: true,
    }));

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/authEmail`, {
        email: formValues.email,
      });

      if (res.status === 200) {
        alert('인증 코드가 이메일로 전송되었습니다.');
        setIsOk((prev) => ({ ...prev, codePost: true }));
      } else {
        alert('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
        setIsOk((prev) => ({ ...prev, codeVerify: false }));
      }
    } catch (err) {
      console.error('인증 코드 전송 중 오류 발생:', err);
      setErrors((prev) => ({
        ...prev,
        authCode: '인증 코드 전송에 실패했습니다. 다시 시도해주세요.',
      }));
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        codePost: false,
      }));
    }
  };
  const verifyAuthCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({
      ...prev,
      codeVerify: true,
    }));

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/authEmail`, {
        params: {
          email: formValues.email,
          authCode: formValues.authCode,
        },
      });

      if (res.status === 200) {
        setIsOk((prev) => ({
          ...prev,
          codeVerify: true,
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
      setIsLoading((prev) => ({
        ...prev,
        codeVerify: false,
      }));
    }
  };

  const signUp = async () => {
    setIsLoading((prev) => ({
      ...prev,
      signUp: true,
    }));
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/join`, {
        email: formValues.email,
        password: formValues.password,
        passwordCheck: formValues.passwordCheck,
        authCode: formValues.authCode,
      });

      if (res.status === 201) {
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
      setIsLoading((prev) => ({
        ...prev,
        signUp: false,
      }));
    }
  };

  const onSubmitSignUpButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isChecked.service || !isChecked.private) {
      setAgreeError('약관에 모두 동의해야 합니다.');
      return;
    }
    try {
      formSchema.parse(formValues);
      setErrors({ email: '', password: '', passwordCheck: '', authCode: '' });
      void signUp();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = { email: '', password: '', passwordCheck: '', authCode: '' };
        error.errors.forEach((err) => {
          if (err.path.length === 1) {
            newErrors[err.path[0] as keyof FormValues] = err.message;
          } else if (err.path.length === 0) {
            newErrors.passwordCheck = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return {
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
  };
};
