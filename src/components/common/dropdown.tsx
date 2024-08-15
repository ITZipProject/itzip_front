import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  children: (props: {
    isOpen: boolean;
    selectedOption: string;
    toggleDropdown: () => void;
    handleSelect: (option: string) => void;
  }) => React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options,
  selectedOption,
  onSelect,
  children,
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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      {children({
        isOpen,
        selectedOption,
        toggleDropdown,
        handleSelect,
      })}
    </div>
  );
};

export default Dropdown;
