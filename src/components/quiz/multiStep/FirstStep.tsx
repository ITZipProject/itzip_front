/* eslint-disable */
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { QuizRatings, QuizCategories } from '@/data/QuizData';

import StepIndicator from './StepIndicator';

interface StepProps {
  errors: any;
}

export function FirstStep({ errors }: StepProps) {
  const { register, setValue, watch } = useFormContext();

  const selectedDifficulty = watch('difficulty');

  const handleDifficultyChange = (difficulty: string) => {
    setValue('difficulty', difficulty, { shouldValidate: true });
  };

  return (
    <div className=" flex flex-col items-center justify-center gap-10">
      <StepIndicator currentStep={1} totalSteps={3} />
      <div className="flex flex-col gap-3">
        <h3>카테고리</h3>
        <select
          {...register('category', { valueAsNumber: true })}
          className="rounded-md bg-color-button-tertiary px-3 py-1"
        >
          <option value="">목록</option>
          {QuizCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryname}
            </option>
          ))}
        </select>

        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <h3>난이도</h3>
        <div className="flex gap-5">
          {QuizRatings.map((rating) => (
            <button
              key={rating.value}
              type="button"
              className={`rounded-md border px-12 py-2 ${
                selectedDifficulty === rating.label ? 'bg-slate-900 text-white' : ''
              }`}
              onClick={() => handleDifficultyChange(rating.label)}
            >
              <h3>{rating.label}</h3>
            </button>
          ))}
        </div>
        <input type="hidden" {...register('difficulty')} value={selectedDifficulty || ''} />
        {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}
      </div>
    </div>
  );
}
