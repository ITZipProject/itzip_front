import { useModal } from '@/lib/context/ModalContext';

interface AskProps {
  text: string;
  textColor: string;
  modalName?: string;
}

export default function Ask({ text, textColor, modalName }: AskProps) {
  const { openModal } = useModal();
  return (
    <div>
      <button
        onClick={() => openModal(modalName || '')}
        className={`text-[ my-spacing-05${textColor}] underline-offset-4 hover:underline`}
      >
        {text}
      </button>
    </div>
  );
}
