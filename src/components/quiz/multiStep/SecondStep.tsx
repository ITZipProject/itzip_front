import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

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
    <div>
      <h3>문제</h3>
      <input type="text" className="w-full bg-slate-900 rounded-md" {...register('question')} />
      {errors.question && <p className="text-red-500">{errors.question.message}</p>}

      <h3>선택지</h3>
      <div>
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="radio"
              name="answer"
              checked={answer === option}
              onChange={() => handleAnswerChange(option)}
            />
            <input
              type="text"
              className="flex-grow border bg-slate-900 rounded-md"
              value={option}
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
            className="py-1 px-3 border bg-slate-900 text-white rounded"
          >
            선택지 추가
          </button>
        )}
      </div>
      {errors.options && <p className="text-red-500">{errors.options.message}</p>}
      {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
    </div>
  );
}