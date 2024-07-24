'use client';
import DetailResumeApi from '@/api/resume/detailResume';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { createResumeSchemaType } from '@/utils/createResumeSchema';
interface IDetailResumeProps {}

const DetailResumeLayout: React.FunctionComponent<IDetailResumeProps> = (props) => {
  const ResumeId = parseInt(usePathname().split('/')[2]);
  const [ResumeData, setResumeData] = React.useState<createResumeSchemaType>();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DetailResumeApi(ResumeId);
        setResumeData(data?.resume);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    ResumeData && (
      <div>
        <p>{ResumeData.email}</p>
        <p>{ResumeData.phone}</p>
        <p>{ResumeData.resume_title}</p>
        <p>{ResumeData.introduction}</p>
      </div>
    )
  );
};

export default DetailResumeLayout;
