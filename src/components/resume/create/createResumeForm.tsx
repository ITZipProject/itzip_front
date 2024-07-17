"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createResumeSchema,
  createResumeSchemaType,
} from "@/utils/createResumeSchema";
import SchoolSearch, { schoolNameAtom } from "./schoolSearch";
import { useAtomValue } from "jotai";
import CreateResumeApi from "@/api/resume/createResume";
import { useRouter } from "next/navigation";
import { RESUME_FORMDATA } from "@/lib/constants";

const CreateResumeForm: React.FunctionComponent = (props) => {
  const [searchModalOpen, setSearchModalOpen] = React.useState(false);

  const schoolName = useAtomValue(schoolNameAtom);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createResumeSchemaType>({
    resolver: zodResolver(createResumeSchema),
  });

  const onSubmit = async (resumeData: createResumeSchemaType) => {
    try {
      const data = await CreateResumeApi({ resumeData, schoolName });
      router.push(`/resume/${data.resumeId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setSearchModalOpen(true);
  };
  const closeModal = () => {
    setSearchModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {RESUME_FORMDATA.map((resumeDataName) => (
        <div key={resumeDataName}>
          <label>{resumeDataName}:</label>
          <input
            {...register(resumeDataName as keyof createResumeSchemaType)}
          />
          {errors[resumeDataName as keyof createResumeSchemaType] && (
            <p>
              {errors[resumeDataName as keyof createResumeSchemaType]?.message}
            </p>
          )}
        </div>
      ))}

      <div>
        <button type="button" onClick={openModal}>
          학력 추가하기
        </button>
        <SchoolSearch isOpen={searchModalOpen} onRequestClose={closeModal} />
        {schoolName && (
          <div>
            <span>{schoolName}</span>
          </div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateResumeForm;
