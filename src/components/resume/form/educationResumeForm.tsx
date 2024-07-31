import * as React from 'react';
import { useAtom } from 'jotai';
import { educationResumeAtom, errorsAtom } from './ResumeAtoms';

interface IEducationResumeFormProps {}

const EducationResumeForm: React.FunctionComponent<IEducationResumeFormProps> = (props) => {
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
    <div>
      <label>학교 이름</label>
      <input
        type="text"
        name="school_name"
        value={educationResumeDatas.school_name}
        onChange={handleChange}
        style={{ borderColor: errors?.educationResume?.school_name ? 'red' : '' }}
        placeholder="학교 이름"
      ></input>
      <label>졸업 유/무</label>
      <select
        name="status"
        value={educationResumeDatas.status}
        onChange={handleChange}
        style={{ borderColor: errors?.educationResume?.status ? 'red' : '' }}
      >
        <option value="GRADUATION">졸업</option>
        <option value="enrollment">재학</option>
      </select>
      <label>학과</label>
      <input
        type="text"
        name="major"
        value={educationResumeDatas.major}
        onChange={handleChange}
        style={{ borderColor: errors?.educationResume?.major ? 'red' : '' }}
        placeholder="학과"
      ></input>
      <label>입학일</label>
      <input
        type="date"
        name="start_date"
        value={educationResumeDatas.start_date}
        onChange={handleChange}
        style={{ borderColor: errors?.educationResume?.start_date ? 'red' : '' }}
      ></input>
      <label>졸업일</label>
      <input
        type="date"
        name="end_date"
        value={educationResumeDatas.end_date}
        onChange={handleChange}
        style={{ borderColor: errors?.educationResume?.end_date ? 'red' : '' }}
      ></input>
    </div>
  );
};

export default EducationResumeForm;
