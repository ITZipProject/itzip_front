import { CheckAccessTokenResponse } from '@/types/token';

import instance from '../axiosInstance';

export const getAccessToken = async () => {
  const { data } = await instance.get<CheckAccessTokenResponse>('/token/verify-access', {});

  return data;
};

export const postNewAccessToken = async () => {
  const { headers } = await instance.post('user/refreshToken', {
    headers: {
      'Both-Tokens': true,
    },
  });

  const authorizationHeader: string | undefined = headers['authorization'] as string | undefined;
  return { accessToken: authorizationHeader };
};
