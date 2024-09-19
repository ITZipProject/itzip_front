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
  signUp: boolean;
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
