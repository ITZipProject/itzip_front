export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 16;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/;
export const PASSWORD_REGEX_ERROR = '비밀번호는 영문 소문자, 숫자, 특수문자를 포함해야 합니다.';

export const PHONE_REGEX = /^010-\d{4}-\d{4}$|^010\d{8}$/;
export const PHONE_REGEX_ERROR = '전화번호 형식이 올바르지 않습니다.';
export const EMAIL_ERROR = '이메일 형식이 올바르지 않습니다.';

export const RESUME_FORMDATA = ['resume_title', 'email', 'phone', 'introduction'];
