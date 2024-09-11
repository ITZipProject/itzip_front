import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-2xl font-bold mb-4">문제 생성하기</h3>

      <div className="flex space-x-4">
        {steps.map((step) => (
          <div
            key={step}
            className={`w-10 h-10 border-2 rounded-full flex items-center justify-center ${
              step <= currentStep ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
            }`}
          >
            <span className="text-white font-bold">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
