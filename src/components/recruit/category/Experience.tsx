import React, { useState } from 'react';
import ReactSlider from 'react-slider';

interface ExperienceFilterProps {
  selectedExperience: number;
  onExperienceChange: (code: number) => void;
}

const Experience: React.FC<ExperienceFilterProps> = ({
  selectedExperience,
  onExperienceChange,
}) => {
  const experienceOptions = [
    { code: 0, label: '경력무관' },
    { code: 1, label: '신입' },
    { code: 2, label: '경력' },
    { code: 3, label: '신입/경력' },
  ];

  const [sliderValue, setSliderValue] = useState(selectedExperience);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    onExperienceChange(value);
  };

  return (
    <div className="experience-filter">
      <h3 className="font-pre-body-01 mb-2">경력</h3>
      <div className="text-center font-bold">
        {experienceOptions[sliderValue].label}
      </div>
      <div className="mb-4">
        <ReactSlider
          className="w-full h-10 flex items-center"
          thumbClassName="w-6 h-6 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
          trackClassName="h-2 bg-gray-200 rounded-full"
          defaultValue={0}
          value={sliderValue}
          onChange={handleSliderChange}
          min={0}
          max={3}
          marks
          renderMark={(props) => (
            <div 
              {...props} 
              className="w-1 h-4 bg-gray-400 rounded-full -mt-1"
            />
          )}
          renderThumb={(props, state) => (
            <div {...props}>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                {state.valueNow}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Experience;