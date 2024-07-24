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
        <div className="flex flex-col gap-2 w-full">
            <input
                className="rounded-[16px]  h-10 focus:outline-none ring-1 focus:ring-2 transition ring-neutral-200 focus:ring-black border-none placeholder:text-neutral-400"
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
