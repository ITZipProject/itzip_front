import React from 'react';
import './Checkbox.css';  // CSS 파일을 불러옵니다.

export interface CheckboxProps {
  label?: string; // label을 선택적으로 사용할 수 있도록 수정
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
      {label && <span className="checkbox-label">{label}</span>} {/* label이 있을 때만 렌더링 */}
    </label>
  );
};

export const CheckOnly: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="check-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="checkmark-only"></span>
    </label>
  );
};

export default Checkbox;
