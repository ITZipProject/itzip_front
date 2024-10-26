import axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';

import instance from '@/api/axiosInstance';
import { errorsAtom, formValuesAtom, isOkAtom, loadingAtom } from '@/atoms/formAtoms';
import { useModal } from '@/lib/context/ModalContext';
import { FormValues } from '@/types/auth';

// const formSchema = z
//   .object({
//     email: z
//       .string()
//       .min(1, '이메일을 입력해주세요.')
//       .email('올바른 이메일 형식이 아닙니다.')
//       .toLowerCase(),
//     password: z
//       .string()
//       .min(1, '비밀번호를 입력해주세요.')
//       .min(PASSWORD_MIN_LENGTH, `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`)
//       .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
//     passwordCheck: z
//       .string()
//       .min(1, '비밀번호 확인을 입력해주세요.')
//       .min(PASSWORD_MIN_LENGTH, `비밀번호 확인는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`),
//     authCode: z.string().min(1, '인증 코드를 입력해주세요.'),
//     agreeTerms: z.boolean(),
//   })
//   .refine((data) => data.password === data.passwordCheck, {
//     message: '비밀번호가 일치하지 않습니다.',
//     path: ['passwordCheck'],
//   })
//   .refine((data) => data.agreeTerms === true, {
//     message: '약관에 모두 동의해야 합니다.',
//     path: ['agreeTerms'],
//   });

export const useSignUp = () => {
  const [formValues, setFormValues] = useAtom(formValuesAtom);
  const [errors] = useAtom(errorsAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [isOk, setIsOk] = useAtom(isOkAtom);
  const { closeModal } = useModal();
  const onClickResetButton = (field: keyof FormValues) => {
    setFormValues((prev) => ({ ...prev, [field]: '' }));
  };

  const onChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleApiError = (error: unknown, defaultMessage: string) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.status === 400) {
        alert(axiosError.response.data.message || defaultMessage);
      } else {
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } else {
      alert(defaultMessage);
    }
  };

  const checkEmailDuplicate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, emailCheck: true }));

    try {
      const res = await instance.get('/user/checkDuplicateEmail', {
        params: { email: formValues.email },
        headers: { 'No-Auth': true },
      });

      const isEmailAvailable = res.status === 200;
      setIsOk((prev) => ({
        ...prev,
        emailCheck: isEmailAvailable,
        codeHidden: isEmailAvailable,
      }));

      alert(isEmailAvailable ? '사용 가능한 이메일입니다.' : '사용할 수 없는 이메일입니다.');
    } catch (error) {
      setIsOk((prev) => ({ ...prev, emailCheck: false, codeHidden: false }));
      handleApiError(error, '이메일 중복 확인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading((prev) => ({ ...prev, emailCheck: false }));
    }
  };

  const sendAuthCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, codePost: true }));

    try {
      const res = await instance.post(
        '/user/authEmail',
        { email: formValues.email },
        { headers: { 'No-Auth': true } },
      );

      if (res.status === 200) {
        alert('인증 코드가 이메일로 전송되었습니다.');
        setIsOk((prev) => ({ ...prev, codePost: true }));
      } else {
        throw new Error('인증 코드 전송에 실패했습니다.');
      }
    } catch (error) {
      setIsOk((prev) => ({ ...prev, codeVerify: false }));
      handleApiError(error, '인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading((prev) => ({ ...prev, codePost: false }));
    }
  };

  const verifyAuthCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, codeVerify: true }));

    try {
      const res = await instance.get('/user/authEmail', {
        params: {
          email: formValues.email,
          authCode: formValues.authCode,
        },
        headers: { 'No-Auth': true },
      });

      if (res.status === 200) {
        setIsOk((prev) => ({ ...prev, codeVerify: true }));
        alert('인증이 완료되었습니다.');
      } else {
        throw new Error('인증 실패');
      }
    } catch (error) {
      setIsOk((prev) => ({ ...prev, codeCheck: false }));
      handleApiError(error, '인증 과정에서 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading((prev) => ({ ...prev, codeVerify: false }));
    }
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, signUp: true }));
    try {
      const res = await instance.post('/user/join', {
        email: formValues.email,
        password: formValues.password,
        password_check: formValues.passwordCheck,
        auth_code: formValues.authCode,
      });
      console.log('data__', res);
      closeModal('signUpEmailModal');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading((prev) => ({ ...prev, signUp: false }));
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
    signUp,
  };
};
