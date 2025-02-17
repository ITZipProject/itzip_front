'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classNames?: string;
  children: ReactNode;
  loading?: boolean;
  variant: 'basedButton' | 'nonBorderButton' | 'none';
}

const Button = ({ children, classNames, variant, loading, ...rest }: ButtonProps) => {
  const { pending } = useFormStatus();

  const variantStyles = {
    basedButton: `w-full h-spacing-12 text-white bg-Blue-400
        rounded-radius-03 disabled:bg-Grey-100 flex items-center justify-center disabled:text-white text-14 font-semibold
        disabled:cursor-not-allowed hover:bg-Blue-300 focus:bg-Blue-500 active:bg-Bule-200 border-lg transition-colors`,
    nonBorderButton: `border border-Grey-200 py-[10px] px-[20px] rounded-xl text-[12px]`,
    none: ``,
  };
  return (
    <button
      {...rest}
      disabled={pending || loading}
      className={`${variantStyles[variant]} ${classNames} `}
    >
      {pending || loading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
