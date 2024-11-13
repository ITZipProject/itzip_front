import instance from '../axiosInstance';

export const getUser = async (accessToken: string) => {
  const user = await instance.get('/user', {
    headers: {
      'No-Auth': true,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return user;
};
