import { useModal } from '@/lib/context/ModalContext';

interface AskProps {
  text: string;
  modalName?: string;
}

export default function SmallAsk({ text, modalName }: AskProps) {
  const { openModal } = useModal();
  return (
    <div>
      <button
        onClick={() => openModal(modalName || '')}
        className={`text-12 font-[500] text-Blue-500 underline-offset-4 hover:underline`}
      >
        {text}
      </button>
    </div>
  );
}
