/* eslint-disable */
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import StepIndicator from './StepIndicator';

interface StepProps {
  errors: any;
}

export function SecondStep({ errors }: StepProps) {
  const { register, setValue, watch } = useFormContext();
  const [options, setOptions] = useState(['', '']);
  const answer = watch('answer');

  const updateOptions = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    setValue('options', newOptions);
  };

  const handleAnswerChange = (value: string) => {
    setValue('answer', value);
  };

  return (
    <div className="flex flex-col gap-5">
      <StepIndicator currentStep={2} totalSteps={3} />
      <div className="flex flex-col gap-3">
        <h3>문제</h3>
        <input type="text" className="w-full rounded-md bg-slate-900" {...register('question')} />
        {errors.question && <p className="text-red-500">{errors.question.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <h3>선택지</h3>
        <div className="felx flex-col">
          {options.map((option, index) => (
            <div key={index} className="mb-2 flex items-center gap-3">
              <input
                type="radio"
                name="answer"
                checked={answer === option}
                onChange={() => handleAnswerChange(option)}
              />
              <input
                type="text"
                className="grow rounded-md border bg-slate-900"
                value={option}
                placeholder="답안을 입력해 주세요"
                onChange={(e) => updateOptions(index, e.target.value)}
              />
              {options.length > 2 && (
                <button onClick={() => setOptions(options.filter((_, i) => i !== index))}>X</button>
              )}
            </div>
          ))}
          {options.length < 4 && (
            <button
              onClick={() => setOptions([...options, ''])}
              className="rounded border bg-slate-900 px-3 py-1 text-white"
            >
              선택지 추가
            </button>
          )}
        </div>
        {errors.options && <p className="text-red-500">{errors.options.message}</p>}
        {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
      </div>
    </div>
  );
}
