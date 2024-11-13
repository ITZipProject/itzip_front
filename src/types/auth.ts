//회원가입

export type FormValues = {
  email: string;
  password: string;
  passwordCheck: string;
  authCode: string;
  agreeTerms: boolean;
};

export type LoadingTypes = {
  emailCheck: boolean;
  codePost: boolean;
  codeVerify: boolean;
  createAccount: boolean;
  join: boolean;
  logout: boolean;
  userOut: boolean;
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
