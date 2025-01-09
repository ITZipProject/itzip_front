import { useAtom } from 'jotai';
import * as React from 'react';

import { careerResumeAtom, errorsAtom } from './ResumeAtoms';

const CareerResumeForm: React.FC = () => {
  const [careerList, setCareerList] = useAtom(careerResumeAtom);
  const [careerErrors, setCareerErrors] = useAtom(errorsAtom);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const updatedList = [...careerList];
    updatedList[index] = { ...updatedList[index], [name]: value };
    setCareerList(updatedList);
    setCareerErrors((prevErrors) => ({
      ...prevErrors,
      careerResume: {
        ...prevErrors.careerResume,
        [index]: {
          ...prevErrors.careerResume?.[index],
          [name]: '',
        },
      },
    }));
  };

  const handleAdd = () => {
    setCareerList([
      ...careerList,
      {
        company_name: '',
        department: '',
        status: 'WORKING',
        start_date: '',
        end_date: '',
      },
    ]);
  };

  const handleDelete = (index: number) => {
    setCareerList(careerList.filter((_, i) => i !== index));
    setCareerErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors.careerResume?.[index];
      return updatedErrors;
    });
  };

  return (
    <div className="space-y-6">
      {careerList.map((career, index) => (
        <div key={index} className="space-y-4 rounded-lg bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">경력사항 {index + 1}</h3>
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="text-gray-400 hover:text-red-500"
            >
              삭제
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">회사명</label>
              <input
                type="text"
                name="company_name"
                value={career.company_name}
                onChange={(e) => handleChange(index, e)}
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  careerErrors.careerResume?.[index]?.company_name
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {careerErrors.careerResume?.[index]?.company_name && (
                <p className="text-sm text-red-500">
                  {careerErrors.careerResume[index].company_name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">부서</label>
              <input
                type="text"
                name="department"
                value={career.department}
                onChange={(e) => handleChange(index, e)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">재직상태</label>
              <select
                name="status"
                value={career.status}
                onChange={(e) => handleChange(index, e)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="WORKING">재직중</option>
                <option value="LEAVE">퇴사</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">입사일</label>
              <input
                type="date"
                name="start_date"
                value={career.start_date}
                onChange={(e) => handleChange(index, e)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">퇴사일</label>
              <input
                type="date"
                name="end_date"
                value={career.end_date}
                onChange={(e) => handleChange(index, e)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="flex w-full items-center justify-center rounded-lg border border-blue-500 px-4 py-2 text-blue-500 transition-colors duration-200 hover:bg-blue-50"
      >
        + 경력 추가
      </button>
    </div>
  );
};

export default CareerResumeForm;
