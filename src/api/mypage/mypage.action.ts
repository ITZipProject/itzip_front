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

export const checkNickname = async () => {
  const res = await instance.get('/mypage/checkDuplicateNickname');
  console.log(res);
};

export const editNickname = async () => {
  const res = await instance.patch('/mypage/nickname');
  console.log(res);
};

export const editPassword = async () => {
  const res = await instance.patch('/mypage/password');
  console.log(res);
};

export const editProfileImage = async () => {
  const res = await instance.patch('/mypage/profileImage');
  console.log(res);
};
