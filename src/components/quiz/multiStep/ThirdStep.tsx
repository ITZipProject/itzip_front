import React from 'react';

import StepIndicator from './StepIndicator';

export function ThirdStep() {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <StepIndicator currentStep={3} totalSteps={3} />
      <h3 className="text-2xl font-bold">문제가 생성되었습니다!</h3>
    </div>
  );
}
