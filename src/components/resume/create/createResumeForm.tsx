"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createResumeSchema,
  createResumeSchemaType,
} from "@/utils/createResumeSchema";
interface ICreateResumeFormProps {}

const CreateResumeForm: React.FunctionComponent<ICreateResumeFormProps> = (
  props
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createResumeSchemaType>({
    resolver: zodResolver(createResumeSchema),
  });

  const onSubmit = (data: createResumeSchemaType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Resume Title:</label>
        <input {...register("resume_title")}></input>
        {errors.resume_title && <p>{errors.resume_title.message}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input {...register("email")}></input>
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Phone:</label>
        <input {...register("phone")}></input>
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div>
        <label>Introduction:</label>
        <textarea {...register("introduction")}></textarea>
        {errors.introduction && <p>{errors.introduction.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateResumeForm;
