import { XCircleIcon } from '@heroicons/react/16/solid';
import { InputHTMLAttributes } from 'react';
import resetBtn from '../../../public/icons/common/Ic/vector.png';
import Image from 'next/image';
interface InputProps {
  name: string;
  errors?: string[];
  onClick?: () => void;
}

export default function Input({
  name,
  errors = [],
  onClick,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className=" w-full gap-2">
      <div className="relative flex flex-col w-full">
        <input
          className="rounded-[12px] px-[18px] py-[16px] focus:outline-none ring-1 focus:ring-2 transition ring-[#AEAEAE] focus:ring-[#3733ED] border-none placeholder:text-[#767676]"
          name={name}
          {...rest}
        />
        <button onClick={onClick}>
          <Image
            src={resetBtn}
            width={19}
            height={19}
            alt="resetbtn"
            className="absolute right-[4px] top-5"
          />
        </button>
      </div>
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
