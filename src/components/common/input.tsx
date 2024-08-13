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
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
