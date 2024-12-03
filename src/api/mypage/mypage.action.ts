import axios from 'axios';
import instance from '../axiosInstance';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUser = async (accessToken: string) => {
  const user = await instance.get('/user', {
    headers: {
      'No-Auth': true,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return user;
};

export const checkNickname = async (nickname: string, accessToken: string) => {
  const res = await axios.get(`${BASE_URL}/mypage/checkDuplicateNickname`, {
    params: {
      nickname,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
};

export const editNickname = async (nickname: string, accessToken: string) => {
  const res = await axios.patch(
    `${BASE_URL}/mypage/nickname`,
    { nickname },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};

export const editPassword = async (password: string, accessToken: string) => {
  const res = await axios.patch(
    `${BASE_URL}/mypage/password`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};

export const updateProfileImage = async (file: File, accessToken: string) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.patch(`${BASE_URL}/api/mypage/profileImage`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const logout = async (accessToken: string) => {
  const res = await axios.delete(`${BASE_URL}/user/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('logout', res.data);
  return res.data;
};
