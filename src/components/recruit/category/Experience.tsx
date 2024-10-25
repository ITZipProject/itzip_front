import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';

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
  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 10]);

  useEffect(() => {
    const min = isNaN(selectedExperienceMin) ? 0 : selectedExperienceMin;
    const max = isNaN(selectedExperienceMax) ? 10 : selectedExperienceMax;
    setSliderValues([min, max]);
  }, [selectedExperienceMin, selectedExperienceMax]);

  const handleSliderChange = (value: [number, number]) => {
    setSliderValues(value);
    onExperienceChange(value[0], value[1]);
  };

  const formatExperience = (years: number) => {
    if (isNaN(years)) return '경력 무관';
    if (years === 0) return '신입';
    if (years >= 10) return '10년 이상';
    return `${years}년`;
  };

  return (
    <div className="experience-filter">
      <h3 className="font-pre-body-01 mb-2">경력</h3>
      <div className="mb-2 text-center font-bold">
        {sliderValues[0] === sliderValues[1]
          ? formatExperience(sliderValues[0])
          : `${formatExperience(sliderValues[0])} ~ ${formatExperience(sliderValues[1])}`}
      </div>
      <div className="mb-4">
        <ReactSlider
          className="h-3 w-full"
          thumbClassName="
            absolute h-5 w-5 
            -translate-y-1/4 
            cursor-pointer 
            rounded-full 
            bg-blue-500 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:ring-opacity-50
            hover:bg-blue-600
            translate-y-0
          "
          trackClassName="
            h-1 
            top-1
            rounded-full 
            bg-gray-200
            [&.slider-track-1]:bg-blue-500
          "
          defaultValue={[0, 10]}
          value={sliderValues}
          onChange={handleSliderChange}
          min={0}
          max={10}
          step={1}
          pearling
          minDistance={1}
        />
      </div>
    </div>
  );
};

export default Experience;
