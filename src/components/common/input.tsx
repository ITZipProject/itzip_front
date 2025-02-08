// React 관련
import { XCircleIcon } from '@heroicons/react/16/solid';
import { InputHTMLAttributes } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

import { InputProps } from '@/types/input';

import { Margin } from './margin';
import AccentStar from '../auth/accent-star';

export default function Input({
  name,
  errors,
  messages,
  onClick,
  labelTitle,
  title,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full  gap-2">
      <div className="relative flex w-full flex-col">
        {title && (
          <div className="flex items-center pb-2">
            <label htmlFor={name || labelTitle}>{title}</label>
            <AccentStar />
          </div>
        )}
        <input
          id={name || labelTitle}
          className={`rounded-md border-none px-[10px] py-[14px] ring-1 ring-gray-400 
          transition placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary
          disabled:bg-gray-100 disabled:text-gray-500 ${errors && 'ring-[#E46969]'} ${messages && 'ring-green-400'}`}
          name={name}
          {...rest}
        />
        {/* todo: reset button  */}
        {onClick && (
          <button
            type="button"
            className=" absolute right-2 top-1/2  rounded-full 
            p-1 opacity-0 transition-opacity duration-300 hover:opacity-100 hover:bg-red-200"
            onClick={onClick}
            aria-label="입력값 초기화"
          >
            <XCircleIcon className="size-[19px]" />
          </button>
        )}
      </div>
      <Margin height={'9px'} />
      {errors && (
        <span className="text-[12px] font-[500] text-[#E46969]">
          <div className="mt-2 flex items-center gap-[4.5px]">
            <XCircleIcon className="size-[19px]" />
            {errors}
          </div>
        </span>
      )}
      {messages && (
        <span className="text-[12px] font-[500] text-green-400">
          <div className="mt-2 flex items-center gap-[4.5px]">
            <FaCheckCircle className="size-[19px]" />
            {messages}
          </div>
        </span>
      )}
    </div>
  );
}
