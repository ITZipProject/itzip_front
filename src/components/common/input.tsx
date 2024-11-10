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
          className={`rounded-radius-03 border-none px-[10px] py-spacing-05 ring-1 ring-Grey-400 
          transition placeholder:text-Grey-600 focus:outline-none focus:ring-2 focus:ring-Blue-400
          disabled:bg-Grey-100 disabled:text-Grey-500 ${errors && 'ring-[#E46969]'} ${messages && 'ring-green-400'}`}
          name={name}
          {...rest}
        />
        {/* todo: reset button  */}
        {onClick && (
          <button
            type="button"
            className="hover:bg-Grey-10 absolute right-spacing-02 top-3 rounded-full 
            p-1 opacity-0 transition-opacity duration-300 hover:opacity-100"
            onClick={onClick}
            aria-label="입력값 초기화"
          >
            <XCircleIcon className="size-[19px]" />
          </button>
        )}
      </div>
      <Margin height={'9px'} />
      {errors && (
        <span className="text-12 font-[500] text-color-text-warning">
          <div className="mt-2 flex items-center gap-[4.5px]">
            <XCircleIcon className="size-[19px]" />
            {errors}
          </div>
        </span>
      )}
      {messages && (
        <span className="text-12 font-[500] text-green-400">
          <div className="mt-2 flex items-center gap-[4.5px]">
            <FaCheckCircle className="size-[19px]" />
            {messages}
          </div>
        </span>
      )}
    </div>
  );
}
