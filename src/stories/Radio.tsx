import React from 'react';
import './Radio.css';

export interface RadioProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({ label, name, value, checked, onChange }) => {
  return (
    <label className="radio-container">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="radiomark"></span>
      {label}
    </label>
  );
};

export default Radio;
