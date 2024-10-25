import { XCircleIcon } from '@heroicons/react/16/solid';
import { InputHTMLAttributes } from 'react';
import resetBtn from '../../../public/icons/common/Ic/vector.png';
import Image from 'next/image';
import { Margin } from './margin';
import { InputProps } from '@/types/input';
import AccentStar from '../auth/\baccent-star';

export default function Input({
  name,
  errors,
  onClick,
  labelTitle,
  title,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className=" w-full gap-2">
      <div className="relative flex flex-col w-full">
        <div className="flex items-center pb-2">
          <label htmlFor={labelTitle}>{title}</label>
          {title ? <AccentStar /> : ''}
        </div>
        <input
          className="rounded-[12px] px-[18px] py-[16px] focus:outline-none ring-1 focus:ring-2 transition ring-[#AEAEAE] focus:ring-[#3733ED] border-none placeholder:text-[#767676]"
          name={name}
          {...rest}
        />
        <button
          className="absolute right-[4px] top-3 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full p-1 hover:bg-Grey-10"
          onClick={onClick}
        >
          <Image src={resetBtn} width={19} height={19} alt="resetbtn" />
        </button>
      </div>
      <Margin height={'9px'} />
      {errors ? (
        <span className="text-color-text-warning text-[12px] font-[500]">
          <div className="flex items-center gap-[4.5px] mt-2">
            <XCircleIcon className="size-[19px]" />
            {errors}
          </div>
        </span>
      ) : (
        ''
      )}
    </div>
  );
}
