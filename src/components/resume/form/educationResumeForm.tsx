import { useAtom } from 'jotai';
import * as React from 'react';

import { educationResumeAtom, errorsAtom } from './ResumeAtoms';

const EducationResumeForm: React.FunctionComponent = () => {
  const [educationResumeDatas, seteducationResumeDatas] = useAtom(educationResumeAtom);
  const [errors, setErrors] = useAtom(errorsAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    seteducationResumeDatas((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  return (
    <div className="space-y-6 rounded-lg bg-white">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 학교 이름 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">학교 이름</label>
          <input
            type="text"
            name="school_name"
            value={educationResumeDatas.school_name}
            onChange={handleChange}
            placeholder="학교 이름을 입력하세요"
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors?.educationResume?.school_name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        {/* 졸업 유/무 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">졸업 상태</label>
          <select
            name="status"
            value={educationResumeDatas.status}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors?.educationResume?.status ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="GRADUATION">졸업</option>
            <option value="enrollment">재학</option>
          </select>
        </div>

        {/* 학과 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">전공</label>
          <input
            type="text"
            name="major"
            value={educationResumeDatas.major}
            onChange={handleChange}
            placeholder="전공을 입력하세요"
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors?.educationResume?.major ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        {/* 입학일 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">입학일</label>
          <input
            type="date"
            name="start_date"
            value={educationResumeDatas.start_date}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors?.educationResume?.start_date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        {/* 졸업일 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">졸업일</label>
          <input
            type="date"
            name="end_date"
            value={educationResumeDatas.end_date}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors?.educationResume?.end_date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default EducationResumeForm;
