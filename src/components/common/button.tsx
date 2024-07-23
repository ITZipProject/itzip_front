'use client';
import { useFormStatus } from 'react-dom';

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            className="primary-btn bg-[#D3D3D3] h-[48px] disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed rounded-[16px] text-white"
        >
            {pending ? '로딩 중...' : text}
        </button>
    );
}
