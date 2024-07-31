import axios from 'axios';

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
    const response = await axios.post<Data>(
      `https://00f935c6-42a5-448a-8871-ff95c8a2f12a.mock.pstmn.io/resume/generation`,
      {},
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to fetch data');
  }
}

export default createResumeApi;
