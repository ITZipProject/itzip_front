import { XCircleIcon } from '@heroicons/react/16/solid';
import { InputHTMLAttributes } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col w-full gap-2">
      <input
        className="rounded-[12px] px-[18px] py-[16px] focus:outline-none ring-1 focus:ring-2 transition ring-[#AEAEAE] focus:ring-[#3733ED] border-none placeholder:text-[#767676]"
        name={name}
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-[#E46969] text-[12px] font-[500]">
          <div className="flex items-center gap-[4.5px]">
            <XCircleIcon className="size-[19px]" />
            {error}
          </div>
        </span>
      ))}
    </div>
  );
}
