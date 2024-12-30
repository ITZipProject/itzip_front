import instance from '../axiosInstance';

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
  const res = await instance.get<ApiResponse<UserData>>('/user', {
    headers: {
      'No-Auth': true,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const checkNickname = async (nickname: string, accessToken: string) => {
  const res = await instance.get<ApiResponse<boolean>>('/mypage/checkDuplicateNickname', {
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
  const res = await instance.patch<ApiResponse<{ nickname: string }>>(
    '/mypage/nickname',
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
  const res = await instance.patch<ApiResponse<{ password: string }>>(
    '/mypage/password',
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

  const res = await instance.patch<ApiResponse<{ imageUrl: string }>>(
    '/api/mypage/profileImage',
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

export const logout = async () => {
  const res = await instance.delete<ApiResponse<null>>('/user/logout');
  return res.data;
};
