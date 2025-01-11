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

// 사용자 정보 가져오기 (인증이 필요)
export const getUser = async (): Promise<ApiResponse<UserData>> => {
  const res = await instance.get<ApiResponse<UserData>>('/user');
  return res.data;
};

// 닉네임 중복 체크 (인증이 필요)
export const checkNickname = async (nickname: string) => {
  const res = await instance.get<ApiResponse<boolean>>('/mypage/checkDuplicateNickname', {
    params: { nickname },
  });
  return res.data;
};

// 닉네임 수정 (인증이 필요)
export const editNickname = async (nickname: string) => {
  const res = await instance.patch<ApiResponse<{ nickname: string }>>('/mypage/nickname', {
    nickname,
  });
  return res.data;
};

// 비밀번호 수정 (인증이 필요)
export const editPassword = async (password: string) => {
  const res = await instance.patch<ApiResponse<{ password: string }>>('/mypage/password', {
    password,
  });
  return res.data;
};

// 프로필 이미지 업데이트 (인증이 필요)
export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await instance.patch<ApiResponse<{ imageUrl: string }>>(
    '/api/mypage/profileImage',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

// 로그아웃 (인증이 필요)
export const logoutAction = async () => {
  const res = await instance.delete<ApiResponse<null>>('/user/logout');
  return res.data;
};
