/* eslint-disable */

import * as React from 'react';
import { useAtom } from 'jotai';
import { defaultResumeAtom, errorsAtom } from './ResumeAtoms';

interface IDefaultResumeFormProps {}

const DefaultResumeForm: React.FunctionComponent<IDefaultResumeFormProps> = (props) => {
  const [defaultResumeDatas, setDefaultResumeDatas] = useAtom(defaultResumeAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  const [introduceValue, setIntroduceValue] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'introduction') {
      setIntroduceValue(value);
    }

    setDefaultResumeDatas((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  return (
    <div>
      <label>이력서 제목</label>
      <input
        type="text"
        name="resume_title"
        value={defaultResumeDatas.resume_title}
        onChange={handleChange}
        style={{ borderColor: errors?.defaultResume?.resume_title ? 'red' : '' }}
        placeholder="ooo의 이력서"
      ></input>
      <label>핸드폰 번호</label>
      <input
        type="text"
        name="phone"
        value={defaultResumeDatas.phone}
        onChange={handleChange}
        style={{ borderColor: errors?.defaultResume?.phone ? 'red' : '' }}
        placeholder="01012345678"
      ></input>
      <label>이메일 주소</label>
      <div className="flex">
        <input
          type="email"
          name="email"
          value={defaultResumeDatas.email}
          onChange={handleChange}
          style={{ borderColor: errors?.defaultResume?.email ? 'red' : '' }}
          placeholder="example"
        ></input>
        <select>
          <option value="naver.com">naver.com</option>
          <option value="gmail.com">gmail.com</option>
          <option value="daum.net">daum.net</option>
        </select>
      </div>
      <label>
        <p>간단 소개글</p>
        <p>
          <span>{introduceValue.length}</span>
          <span>500자</span>
        </p>
      </label>
      <textarea
        name="introduction"
        value={defaultResumeDatas.introduction}
        onChange={handleChange}
        style={{ borderColor: errors?.defaultResume?.introduction ? 'red' : '' }}
      />
    </div>
  );
};

export default DefaultResumeForm;
