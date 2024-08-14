import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  iconSrc: string;
  textSize?: string;
  textWeight?: string;
  iconSize?: number;
}

const BlogControlsDropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  iconSrc,
  textSize = 'text-base',
  textWeight = 'font-medium',
  iconSize = 15,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
  );
};

export default BlogControlsDropdown;
