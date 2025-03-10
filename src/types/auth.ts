//회원가입

import { StaticImageData } from 'next/image';

export type FormValues = {
  email: string;
  password: string;
  passwordCheck: string;
  authCode: string;
  agreeTerms: boolean;
};

export type MypageFormValuesTypes = {
  nickname: string;
  password: string;
  image?: File | string | null | StaticImageData;
};

export type MyPageFormLoadingTypes = {
  imageLoading: boolean;
  userStateLoading: boolean;
  nicknameCheck: boolean;
  nicknameUpdate: boolean;
  passwordUpdate: boolean;
  passwordSave: boolean;
  profileSave: boolean;
};

export type LoadingTypes = {
  emailCheck: boolean;
  codePost: boolean;
  codeVerify: boolean;
  createAccount: boolean;
  join: boolean;
  logout: boolean;
  userOut: boolean;
  user: boolean;
  submit: boolean;
};

export type IsOkTypes = {
  emailCheck: boolean;
  codePost: boolean;
  codeVerify: boolean;
  signUp: boolean;
  codeHidden: boolean;
};

export type AgreeTypes = {
  private: boolean;
  service: boolean;
};

export type CheckEmailRequest = {
  email: string;
};
export type CheckEmailResponse = {
  email: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  passwordCheck: string;
  authCode: string;
};

// export type SignUpResponse = {};

export type LoginRequest = {
  email: string;
  password: string;
};

export interface LoginFormType {
  email: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: number;
  nickname: string;
};
