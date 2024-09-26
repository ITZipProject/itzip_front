import { CheckEmailRequest, CheckEmailResponse, SignUpRequest, SignUpResponse } from '@/types/auth';
import instance from '../\baxiosInstance';

export const postSignUp = async (body: SignUpRequest) => {
  const { data } = await instance.post<SignUpResponse>('/user/join', body, {
    headers: {
      'No-Auth': true,
    },
  });

  return data;
};

export const getCheckEmail = async (params: CheckEmailRequest) => {
  const { data } = await instance.get<CheckEmailResponse>('/user/checkDuplicateEmail', {
    params,
    headers: {
      'No-Auth': true,
    },
  });
  return data;
};
