import { FormValues, LoginResponse } from '@/types/auth';
import instance from '../axiosInstance';

export const postLogin = async (body: FormValues) => {
  const { data, headers } = await instance.post<LoginResponse>('/user/login', body, {
    headers: {
      'No-Auth': true,
    },
  });

  return {
    ...data,
    accessToken: headers['authorization'] as string,
    refreshToken: headers['refresh'] as string,
  };
};
