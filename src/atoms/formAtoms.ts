import { atom } from 'jotai';

import { AgreeTypes, FormValues, IsOkTypes, LoadingTypes } from '@/types/auth';

export const formValuesAtom = atom<FormValues>({
  email: '',
  password: '',
  passwordCheck: '',
  authCode: '',
  agreeTerms: false,
});

export const errorsAtom = atom<Partial<FormValues>>({
  email: '',
  password: '',
  passwordCheck: '',
  authCode: '',
});

export const loadingAtom = atom<LoadingTypes>({
  emailCheck: false,
  codePost: false,
  codeVerify: false,
  signUp: false,
});

export const isOkAtom = atom<IsOkTypes>({
  emailCheck: false,
  codePost: false,
  codeVerify: false,
  signUp: false,
  codeHidden: false,
});

export const agreeAtom = atom<AgreeTypes>({
  private: false,
  service: false,
});

export const allCheckedAtom = atom(false);

export const agreeErrorAtom = atom<string>('');
