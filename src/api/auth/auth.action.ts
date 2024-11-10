import instance from '../axiosInstance';

export const checkEmail = async (email: string) => {
  const result = await instance.get('/user/checkDuplicateEmail', {
    params: {
      email,
    },
    headers: {
      'No-Auth': true,
    },
  });
  return result;
};

export const sendCode = async (email: string) => {
  const result = await instance.post(
    '/user/authEmail',
    { email },
    {
      headers: {
        'No-Auth': true,
      },
    },
  );
  return result;
};

export const checkCode = async (email: string, authCode: string) => {
  const result = await instance.get('/user/authEmail', {
    params: {
      email,
      authCode,
    },
    headers: {
      'No-Auth': true,
    },
  });
  return result;
};

export const createAccount = async (
  email: string,
  password: string,
  password_check: string,
  auth_code: string,
) => {
  const result = await instance.post(
    '/user/join',
    {
      email,
      password,
      password_check,
      auth_code,
    },
    {
      headers: {
        'No-Auth': true,
      },
    },
  );
  return result;
};
