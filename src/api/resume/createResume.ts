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

async function createResumeApi({ resumeData, schoolName }: createResumeApiProps) {
  try {
    const response = await axios.post<Data>(
      `https://00f935c6-42a5-448a-8871-ff95c8a2f12a.mock.pstmn.io/resume/generation`,
      {
        resume: {
          resume_title: resumeData.resume_title,
          phone: resumeData.phone,
          email: resumeData.email,
          introduction: resumeData.introduction,
          link_list: [
            { link: 'https://djndasdnjdasn.com' },
            { link: 'https://dfjdsgfjnksfdgjnksdf.com' },
          ],
        },
        education: {
          school_name: schoolName,
          status: 'GRADUATION',
          major: '소프트웨어학과',
          start_date: '2019-03-02',
          end_date: '2023-03-08',
        },
      },
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to fetch data');
  }
}

export default createResumeApi;
