import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

interface UserData {
  email: string;
  nickname: string;
  imageUrl?: string;
}

export const getUser = async (accessToken: string): Promise<ApiResponse<UserData>> => {
  const res = await axios.get<ApiResponse<UserData>>(`${BASE_URL}/user`, {
    headers: {
      'No-Auth': true,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const checkNickname = async (nickname: string, accessToken: string) => {
  const res = await axios.get<ApiResponse<boolean>>(`${BASE_URL}/mypage/checkDuplicateNickname`, {
    params: {
      nickname,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const editNickname = async (nickname: string, accessToken: string) => {
  const res = await axios.patch<ApiResponse<{ nickname: string }>>(
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
  const res = await axios.patch<ApiResponse<{ password: string }>>(
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

  const res = await axios.patch<ApiResponse<{ imageUrl: string }>>(
    `${BASE_URL}/api/mypage/profileImage`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};

export const logout = async (accessToken: string) => {
  const res = await axios.delete<ApiResponse<null>>(`${BASE_URL}/user/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
