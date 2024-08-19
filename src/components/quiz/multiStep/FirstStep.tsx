import React from 'react';
import { useFormContext } from 'react-hook-form';

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
    <div>
      <h3>카테고리</h3>
      <select {...register('category')} className="px-3 py-1 bg-slate-900 rounded-md">
        <option value="">목록</option>
        <option value="프론트엔드">프론트엔드</option>
        <option value="백엔드">백엔드</option>
      </select>
      {errors.category && <p className="text-red-500">{errors.category.message}</p>}

      <h3>난이도</h3>
      <div className="flex gap-5">
        {['Lv.1', 'Lv.2', 'Lv.3'].map((lvl, index) => (
          <button
            key={index}
            type="button"
            className={`border px-12 py-2 rounded-md ${
              selectedDifficulty === lvl ? 'bg-slate-900 text-white' : ''
            }`}
            onClick={() => handleDifficultyChange(lvl)}
          >
            <h3>{lvl}</h3>
          </button>
        ))}
      </div>
      <input type="hidden" {...register('difficulty')} value={selectedDifficulty || ''} />
      {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}
    </div>
  );
}
