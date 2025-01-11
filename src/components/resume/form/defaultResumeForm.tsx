import { useAtom } from 'jotai';
import * as React from 'react';

import { defaultResumeAtom, errorsAtom } from './ResumeAtoms';

const DefaultResumeForm: React.FunctionComponent = () => {
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
    <div className="space-y-6">
      {/* 기본 정보 섹션 */}
      <div className="space-y-4">
        {/* 이력서 제목 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">이력서 제목</label>
          <input
            type="text"
            name="resume_title"
            value={defaultResumeDatas.resume_title}
            onChange={handleChange}
            placeholder="ooo의 이력서"
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors?.defaultResume?.resume_title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        {/* 핸드폰 번호 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">핸드폰 번호</label>
          <input
            type="text"
            name="phone"
            value={defaultResumeDatas.phone}
            onChange={handleChange}
            placeholder="01012345678"
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors?.defaultResume?.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        {/* 이메일 주소 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">이메일 주소</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={defaultResumeDatas.email}
              onChange={handleChange}
              placeholder="example"
              className={`flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors?.defaultResume?.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <select className="w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
            </select>
          </div>
        </div>

        {/* 간단 소개글 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">간단 소개글</label>
            <p className="text-sm text-gray-500">
              <span>{introduceValue.length}</span>
              <span className="mx-1">/</span>
              <span>500자</span>
            </p>
          </div>
          <textarea
            name="introduction"
            value={defaultResumeDatas.introduction}
            onChange={handleChange}
            rows={4}
            className={`w-full resize-none rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors?.defaultResume?.introduction ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultResumeForm;
