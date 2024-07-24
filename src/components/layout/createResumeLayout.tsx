import * as React from "react";
import CreateResumeForm from "../resume/create/createResumeForm";

interface ICreateResumeLayoutProps {}

const CreateResumeLayout: React.FunctionComponent<ICreateResumeLayoutProps> = (
  props
) => {
  return <CreateResumeForm />;
};

export default CreateResumeLayout;
