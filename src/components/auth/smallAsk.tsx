import { useModal } from '@/lib/context/ModalContext';

interface AskProps {
  text: string;
  textColor: string;
  modalName?: string;
}

export default function SmallAsk({ text, textColor, modalName }: AskProps) {
  const { openModal } = useModal();
  return (
    <div>
      <button
        onClick={() => openModal(modalName || '')}
        className={` text-[12px] font-[500] text-[${textColor}] hover:underline underline-offset-4`}
      >
        {text}
      </button>
    </div>
  );
}
