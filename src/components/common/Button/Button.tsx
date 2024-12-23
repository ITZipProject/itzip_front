'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loadingText?: string;
  classNames?: string;
  children: ReactNode;
}

const Button = ({ loadingText, children, classNames, ...rest }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...rest}
      disabled={pending}
      className={`w-full h-spacing-12 text-white bg-Blue-400
        rounded-radius-03 disabled:bg-Grey-100 flex items-center justify-center disabled:text-white text-14 font-semibold
        disabled:cursor-not-allowed hover:bg-Blue-300 focus:bg-Blue-500 active:bg-Bule-200 border-lg ${classNames}`}
    >
      {pending ? loadingText : children}
    </button>
  );
};

export default Button;
