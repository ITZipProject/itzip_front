import Image from 'next/image';
import React from 'react';

import HeadlessDropdown from '../../common/dropdown';

interface BlogControlsDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  iconSrc: string;
  textSize?: string;
  textWeight?: string;
  iconSize?: number;
}

const BlogControlsDropdown: React.FC<BlogControlsDropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  iconSrc,
  textSize = 'text-base',
  textWeight = 'font-medium',
  iconSize = 15,
}) => {
  return (
    <HeadlessDropdown options={options} selectedOption={selectedOption} onSelect={onSelect}>
      {({ isOpen, selectedOption, toggleDropdown, handleSelect }) => (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`flex items-center space-x-4 ${textSize} ${textWeight}`}
          >
            <Image
              src={iconSrc}
              alt="Dropdown Arrow"
              width={iconSize}
              height={iconSize}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
            <span>{selectedOption}</span>
          </button>
          {isOpen && (
            <div className="absolute left-0 z-50 mt-2 overflow-hidden rounded-md bg-white shadow-lg">
              {options.map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`block w-full px-4 py-2 text-left transition-colors duration-200 hover:bg-blue-100 ${textSize} whitespace-nowrap
                    ${index === 0 ? 'rounded-t-md' : ''}
                    ${index === options.length - 1 ? 'rounded-b-md' : ''}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </HeadlessDropdown>
  );
};

export default BlogControlsDropdown;
