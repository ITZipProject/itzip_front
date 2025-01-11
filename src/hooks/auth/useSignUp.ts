import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { z } from 'zod';

import { checkCode, checkEmail, joinAction, sendCode } from '@/api/auth/auth.action';
import { errorsAtom, formValuesAtom, isOkAtom, loadingAtom, messageAtom } from '@/atoms/formAtoms';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import { useModal } from '@/lib/context/ModalContext';
import { FormValues } from '@/types/auth';

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.')
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    passwordCheck: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `비밀번호 확인은 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`),
    authCode: z.string().min(1, '인증 코드를 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

export const useSignUp = () => {
  const [formValues, setFormValues] = useAtom(formValuesAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  const [message, setMessage] = useAtom(messageAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [isOk, setIsOk] = useAtom(isOkAtom);
  const { closeModal } = useModal();

  useEffect(() => {
    if (formValues.password.length >= 4) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  }, [formValues.password.length, setErrors]);

  const onClickResetButton = (field: keyof FormValues) => {
    setFormValues((prev) => ({ ...prev, [field]: '' }));
  };

  const onChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmailDuplicate = async () => {
    setIsLoading((prev) => ({ ...prev, emailCheck: true }));
    try {
      const res = await checkEmail(formValues.email);
      if (res.success) {
        setMessage((prev) => ({ ...prev, email: '사용가능한 이메일 입니다.' }));
        setErrors((prev) => ({ ...prev, email: '' }));
        setIsOk((prev) => ({ ...prev, emailCheck: true }));
        setIsOk((prev) => ({ ...prev, codeHidden: true }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, email: '이미 사용중인 이메일입니다.' }));
      setMessage((prev) => ({ ...prev, email: '' }));
      setIsOk((prev) => ({ ...prev, emailCheck: false }));
    } finally {
      setIsLoading((prev) => ({ ...prev, emailCheck: false }));
    }
  };

  const sendAuthCode = async () => {
    setIsLoading((prev) => ({ ...prev, codePost: true }));
    try {
      await sendCode(formValues.email);
      alert('인증메일을 보냈습니다.');
      setIsOk((prev) => ({ ...prev, codePost: true }));
    } catch (err) {
      alert('인증메일 발송을 실패했습니다. 이메일을 다시 확인해주세요.T0T');
      setIsOk((prev) => ({ ...prev, codePost: false }));
    } finally {
      setIsLoading((prev) => ({ ...prev, codePost: false }));
    }
  };

  const verifyAuthCode = async () => {
    setIsLoading((prev) => ({ ...prev, codeVerify: true }));

    try {
      const res = await checkCode(formValues.email, formValues.authCode);

      if (res.success) {
        setIsOk((prev) => ({ ...prev, codeVerify: true }));
        setMessage((prev) => ({ ...prev, authCode: '인증 완료' }));
        setErrors((prev) => ({
          ...prev,
          authCode: '',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          authCode: '인증코드가 일치하지 않습니다. 인증번호를 다시한번 확인해주세요.',
        }));
      }
    } catch (error) {
      setIsOk((prev) => ({ ...prev, codeCheck: false }));
      setErrors((prev) => ({
        ...prev,
        authCode: '유효한 인증코드가 아닙니다. 다시 한 번 확인해주세요.',
      }));
      setMessage((prev) => ({ ...prev, authCode: '' }));
    } finally {
      setIsLoading((prev) => ({ ...prev, codeVerify: false }));
    }
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, createAccount: true }));

    try {
      const validatedData = formSchema.parse({
        email: formValues.email,
        password: formValues.password,
        passwordCheck: formValues.passwordCheck,
        authCode: formValues.authCode,
      });

      // 요청 시 password_check와 auth_code를 사용
      const res = await joinAction(
        validatedData.email,
        validatedData.password,
        validatedData.passwordCheck,
        validatedData.authCode,
      );
      if (res.success) {
        closeModal();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setErrors((prev) => ({
            ...prev,
            [err.path[0]]: err.message,
          }));
        });
      } else {
        setErrors((prev) => ({
          ...prev,
          email: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다',
        }));
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, createAccount: false }));
    }
  };

  return {
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
  };
};
