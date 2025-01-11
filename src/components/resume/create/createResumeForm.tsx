'use client';

import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import createResumeApi from '@/api/resume/createResume';
import {
  validateCareerData,
  validateDefaultData,
  validateEducationData,
} from '@/utils/ResumeSchema';

import CareerResumeForm from '../form/careerResumeForm';
import DefaultResumeForm from '../form/defaultResumeForm';
import EducationResumeForm from '../form/educationResumeForm';
import {
  careerResumeAtom,
  defaultResumeAtom,
  educationResumeAtom,
  errorsAtom,
  submittedAtom,
} from '../form/ResumeAtoms';

const CreateResumeForm: React.FunctionComponent = () => {
  const [defaultData] = useAtom(defaultResumeAtom);
  const [educationData] = useAtom(educationResumeAtom);
  const [careerData] = useAtom(careerResumeAtom);
  const [, setErrors] = useAtom(errorsAtom);
  const [submitted, setSubmitted] = useAtom(submittedAtom);
  const router = useRouter();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const defaultErrors = validateDefaultData(defaultData);
    const educationErrors = validateEducationData(educationData);
    const careerErrors = validateCareerData(careerData);

    const allErrors = {
      defaultResume: defaultErrors,
      educationResume: educationErrors,
      careerResume: careerErrors,
    };

    const hasErrors = Object.values(allErrors).some(
      (sectionErrors) => sectionErrors && Object.keys(sectionErrors).length > 0,
    );

    if (!hasErrors) {
      setSubmitted(true);
      try {
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
    <div className="mx-auto min-h-screen max-w-3xl bg-white p-6">
      {/* 기본 정보 섹션 */}
      <section className="mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">기본 정보</h2>
          <DefaultResumeForm />
        </div>
      </section>

      {/* 학력 섹션 */}
      <section className="mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">학력 사항</h2>
          </div>
          <EducationResumeForm />
        </div>
      </section>

      {/* 경력 섹션 */}
      <section className="mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">경력 사항</h2>
          </div>
          <CareerResumeForm />
        </div>
      </section>

      {/* 제출 버튼 */}
      <div className="mt-8">
        <button
          onClick={(e) => {
            void handleSubmit(e);
          }}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition duration-200 hover:bg-blue-700"
        >
          이력서 제출하기
        </button>
      </div>

      {/* 성공 메시지 */}
      {submitted && (
        <div className="mt-4 rounded-lg bg-green-50 p-4 text-center text-green-700">
          이력서가 성공적으로 제출되었습니다!
        </div>
      )}
    </div>
  );
};

export default CreateResumeForm;
