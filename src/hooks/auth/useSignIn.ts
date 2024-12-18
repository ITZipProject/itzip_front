import { useAtom } from 'jotai';
import React from 'react';
import { z } from 'zod';

import { join } from '@/api/auth/authServer.action';
import { errorsAtom, formValuesAtom, isOkAtom, loadingAtom } from '@/atoms/formAtoms';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import { useModal } from '@/lib/context/ModalContext';
import { setAccessTokenAtom, setRefreshTokenAtom } from '@/store/useTokenStore';
import { FormValues } from '@/types/auth';

const formValueSchema = z.object({
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
});
console.log(formValueSchema);

const useSignIn = () => {
  const [formValues, setFormValues] = useAtom(formValuesAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [isOk] = useAtom(isOkAtom);
  const { closeModal } = useModal();

  const [, setAccessToken] = useAtom(setAccessTokenAtom);
  const [, setRefreshToken] = useAtom(setRefreshTokenAtom);

  const onChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onClickResetButton = (field: keyof FormValues) => {
    setFormValues((prev) => ({ ...prev, [field]: '' }));
  };

  const signIn = async (formData: FormData) => {
    setIsLoading((prev) => ({ ...prev, join: true }));

    try {
      const res = await join(formData);

      if (res.success) {
        setErrors((prev) => ({ ...prev, email: '' }));
        if (res.data?.accessToken && res.data?.refreshToken) {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          closeModal();
        }
      } else {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (email.length > 1 && password.length > 1) {
          setErrors((prev) => ({ ...prev, email: '아이디 또는 비밀번호가 잘못 되었습니다.' }));
        } else if (password.length < 1) {
          setErrors((prev) => ({ ...prev, password: '비밀번호를 입력해주세요.' }));
        } else if (email.length < 1) {
          setErrors((prev) => ({ ...prev, email: '이메일을 입력해주세요.' }));
        }
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, email: '서버 오류가 발생했습니다.' }));
    } finally {
      setIsLoading((prev) => ({ ...prev, join: false }));
    }
  };

  return {
    formValues,
    errors,
    isLoading,
    isOk,
    signIn,
    onClickResetButton,
    onChangeFormValues,
  };
};

export default useSignIn;
