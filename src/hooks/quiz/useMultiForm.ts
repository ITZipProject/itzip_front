import React from 'react';
import { ReactElement, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

const useMultiForm = (
  steps: ReactElement[],
  methods: UseFormReturn<any>,
  stepField: string[][],
) => {
  const [step, setStep] = useState(0);

  const next = async () => {
    const currentStepField = stepField[step];
    const isValid = await methods.trigger(currentStepField);

    if (isValid && step < steps.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  return {
    back,
    next,
    stepComponent: React.cloneElement(steps[step], {
      errors: methods.formState.errors,
    }),
    isFirstStep: step === 0,
    isLastStep: step === steps.length - 1,
  };
};

export default useMultiForm;
