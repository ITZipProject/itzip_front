import React from 'react';
import './Checkbox.css';  // CSS 파일은 따로 작성하거나, 스타일링 방법에 따라 다르게 처리할 수 있습니다.

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="checkmark"></span>
      {label}
    </label>
  );
};

export default Checkbox;
