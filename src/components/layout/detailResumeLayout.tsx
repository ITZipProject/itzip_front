"use client";
import DetailResumeApi from "@/api/resume/detailResume";
import * as React from "react";
import { usePathname } from "next/navigation";
interface IDetailResumeProps {}

const DetailResumeLayout: React.FunctionComponent<IDetailResumeProps> = (
  props
) => {
  const path = usePathname();
  console.log(path);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DetailResumeApi(1);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default DetailResumeLayout;
