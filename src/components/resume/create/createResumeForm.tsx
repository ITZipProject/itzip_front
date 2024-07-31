'use client';
import * as React from 'react';
import { useAtom } from 'jotai';

import {
  careerResumeAtom,
  defaultResumeAtom,
  educationResumeAtom,
  errorsAtom,
  submittedAtom,
} from '../form/ResumeAtoms';

import DefaultResumeForm from '../form/defaultResumeForm';
import EducationResumeForm from '../form/educationResumeForm';
import CareerResumeForm from '../form/careerResumeForm';

import {
  validateCareerData,
  validateDefaultData,
  validateEducationData,
} from '@/utils/ResumeSchema';

import createResumeApi from '@/api/resume/createResume';

import { useRouter } from 'next/navigation';

import { FormErrors, ICareerResume } from '@/types/resume';

interface ICreateResultProps {}

const CreateResumeForm: React.FunctionComponent<ICreateResultProps> = (props) => {
  const [defaultData, setDefaultData] = useAtom(defaultResumeAtom);
  const [educationData, setEducationData] = useAtom(educationResumeAtom);
  const [careerData, setCareerData] = useAtom(careerResumeAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  const [submitted, setSubmitted] = useAtom(submittedAtom);

  const router = useRouter();

  const resetFormData = () => {
    setDefaultData({
      resume_title: '',
      phone: '',
      email: '',
      introduction: '',
    });
    setEducationData({
      school_name: '',
      status: '',
      major: '',
      start_date: '',
      end_date: '',
    });
    setCareerData([
      {
        company_name: '',
        department: '',
        status: 'WORKING',
        start_date: '',
        end_date: '',
      },
    ]);
  };

  const resetErrors = () => {
    setErrors({
      defaultResume: {},
      educationResume: {},
      careerResume: {},
    });
  };

  const resetSubmitted = () => {
    setSubmitted(false);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const defaultErrors = validateDefaultData(defaultData);
    const educationErrors = validateEducationData(educationData);
    const careerErrors = validateCareerData(careerData);

    const allErrors: FormErrors = {
      defaultResume: defaultErrors,
      educationResume: educationErrors,
      careerResume: careerErrors,
    };
    console.log('All Errors:', allErrors);

    const hasErrors = Object.values(allErrors).some(
      (sectionErrors) => sectionErrors && Object.keys(sectionErrors).length > 0,
    );

    console.log(hasErrors);
    if (!hasErrors) {
      setSubmitted(true);
      try {
        console.log(defaultData, educationData, careerData);
        const data = await createResumeApi({ defaultData, educationData, careerData });
        router.push(`/resume/${data.resumeId}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors(allErrors);
    }
  };

  return (
    <div>
      <DefaultResumeForm />
      <EducationResumeForm />
      <CareerResumeForm />
      <button onClick={handleSubmit}>Submit</button>
      {submitted && <p style={{ color: 'green' }}>Form submitted successfully!</p>}
    </div>
  );
};

export default CreateResumeForm;
