import * as React from 'react';
import { useAtom } from 'jotai';
import { careerResumeAtom, errorsAtom } from './ResumeAtoms';
import { ICareerResume } from '@/types/resume';

const CareerResumeForm: React.FC = () => {
  const [careerList, setCareerList] = useAtom(careerResumeAtom);
  const [careerErrors, setCareerErrors] = useAtom(errorsAtom);

  // 입력 필드 변경 시 호출되는 함수
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const updatedList = [...careerList];
    updatedList[index] = { ...updatedList[index], [name]: value };

    setCareerList(updatedList);

    // 에러 메시지 초기화
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
    <div>
      <h2>Career List</h2>
      {careerList.map((career, index) => (
        <div key={index}>
          <h3>Career {index + 1}</h3>
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="company_name"
              value={career.company_name}
              onChange={(e) => handleChange(index, e)}
              style={{ borderColor: careerErrors.careerResume?.[index]?.company_name ? 'red' : '' }}
            />
            {careerErrors.careerResume?.[index]?.company_name && (
              <p style={{ color: 'red' }}>{careerErrors.careerResume[index].company_name}</p>
            )}
          </div>
          <div>
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={career.department}
              onChange={(e) => handleChange(index, e)}
              style={{ borderColor: careerErrors.careerResume?.[index]?.department ? 'red' : '' }}
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={career.status}
              onChange={(e) => handleChange(index, e)}
              style={{ borderColor: careerErrors.careerResume?.[index]?.status ? 'red' : '' }}
            >
              <option value="WORKING">Working</option>
              <option value="LEAVE">Leave</option>
            </select>
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="start_date"
              value={career.start_date}
              onChange={(e) => handleChange(index, e)}
              style={{ borderColor: careerErrors.careerResume?.[index]?.start_date ? 'red' : '' }}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              name="end_date"
              value={career.end_date}
              onChange={(e) => handleChange(index, e)}
              style={{ borderColor: careerErrors.careerResume?.[index]?.end_date ? 'red' : '' }}
            />
          </div>
          <button type="button" onClick={() => handleDelete(index)}>
            Remove
          </button>
          <hr />
        </div>
      ))}
      <button type="button" onClick={handleAdd}>
        Add New Career
      </button>
    </div>
  );
};

export default CareerResumeForm;
