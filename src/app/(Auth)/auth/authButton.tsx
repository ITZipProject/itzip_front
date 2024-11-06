import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ children, ...props }) => (
  <button
    className={`
      primary-btn 
      h-spacing-12 
      rounded-radius-03 
      bg-Grey-100 
      text-14 
      font-semibold 
      text-white 
      disabled:cursor-not-allowed 
      disabled:bg-Grey-100 
      disabled:text-white
    `}
    {...props}
  >
    {children}
  </button>
);
