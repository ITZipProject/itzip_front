/* eslint-disable */

import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type createResumeApiProps = {
  resumeData: {
    resume_title: string;
    phone: string;
    email: string;
    introduction: string;
  };
  schoolName: string;
};

type Data = {
  resumeId: any;
  schoolName: string;
};

async function createResumeApi({ resumeData, schoolName }: any) {
  try {
    console.log('API 요청 데이터:', {
      resume_title: resumeData.resume_title,
      phone: resumeData.phone,
      email: resumeData.email,
      introduction: resumeData.introduction,
      school_name: schoolName
    });

    const response = await axios.post<Data>(
      `${apiUrl}/resume`,
      {
        resume_title: resumeData.resume_title,
        phone: resumeData.phone,
        email: resumeData.email,
        introduction: resumeData.introduction,
        school_name: schoolName
      }
    );

    console.log('API 응답 데이터:', response.data);
    const data = response.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('API 호출 중 오류 발생:', error);
      if (axios.isAxiosError(error)) {
        console.error('오류 상세 정보:', error.response?.data);
      }
      throw new Error('Failed to fetch data');
    }
    throw new Error('알 수 없는 오류가 발생했습니다');
  }
}

export default createResumeApi;
