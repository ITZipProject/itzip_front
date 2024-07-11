export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함해야합니다.";

export const PHONE_REGEX = /^010-\d{4}-\d{4}$|^010\d{8}$/;
export const PHONE_REGEX_ERROR = "전화번호 형식이 올바르지 않습니다.";
