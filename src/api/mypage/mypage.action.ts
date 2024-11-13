import instance from '../axiosInstance';

export const getUser = async () => {
  const user = await instance.get('/user');
  return user;
};
