import React from 'react';

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

  return (
    <div className="experience-filter">
      <h3 className="font-pre-body-01 mb-2">경력</h3>
      <div className="flex space-x-2">
        {experienceOptions.map((option) => (
          <button
            key={option.code}
            className={`px-4 py-2 rounded ${
              selectedExperience === option.code
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => onExperienceChange(option.code)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Experience;