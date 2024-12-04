import Slider from '@mui/material/Slider';
import React, { useState, useEffect } from 'react';

interface ExperienceFilterProps {
  selectedExperienceMin: number;
  selectedExperienceMax: number;
  onExperienceChange: (min: number, max: number) => void;
}

const Experience: React.FC<ExperienceFilterProps> = ({
  selectedExperienceMin,
  selectedExperienceMax,
  onExperienceChange,
}) => {
  const [value, setValue] = useState<number[]>([0, 10]);

  useEffect(() => {
    const min = isNaN(selectedExperienceMin) ? 0 : selectedExperienceMin;
    const max = isNaN(selectedExperienceMax) ? 10 : selectedExperienceMax;
    setValue([min, max]);
  }, [selectedExperienceMin, selectedExperienceMax]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    if (Array.isArray(newValue)) {
      onExperienceChange(newValue[0], newValue[1]);
    }
  };

  const formatExperience = (years: number) => {
    if (isNaN(years)) return '경력 무관';
    if (years === 0) return '신입';
    if (years >= 10) return '10년 이상';
    return `${years}년`;
  };

  return (
    <div className="experience-filter">
      <div className="mb-4 text-center font-bold">
        {value[0] === value[1]
          ? formatExperience(value[0])
          : `${formatExperience(value[0])} ~ ${formatExperience(value[1])}`}
      </div>
      <div className="px-2">
        <Slider
          value={value}
          onChange={handleChange}
          min={0}
          max={10}
          step={1}
          marks={[
            { value: 0, label: '신입' },
            { value: 10, label: '10년' },
          ]}
          sx={{
            '& .MuiSlider-track': {
              height: 4,
              backgroundColor: '#2563eb',
            },
            '& .MuiSlider-rail': {
              height: 4,
              backgroundColor: '#e5e7eb',
            },
            '& .MuiSlider-thumb': {
              width: 15,
              height: 15,
              backgroundColor: '#2563eb',
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.16)',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Experience;
