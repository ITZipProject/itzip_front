import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mb-4 text-2xl font-bold">문제 생성하기</h3>

      <div className="flex space-x-4">
        {steps.map((step) => (
          <div
            key={step}
            className={`flex size-10 items-center justify-center rounded-full border-2 ${
              step <= currentStep ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
            }`}
          >
            <span className="font-bold text-white">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
