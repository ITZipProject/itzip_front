'use client';

// 로그아웃 추가
import Modal from '@/components/portal/modal';
import { useModal } from '@/lib/context/ModalContext';

interface SignInModalProps {
  modalId: string;
}

const AlertModal: React.FC<SignInModalProps> = ({ modalId }: SignInModalProps) => {
  const { openModals, closeModal } = useModal();
  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  return (
    <Modal isOpen={true} onClose={() => closeModal()}>
      <div className="flex items-center justify-between">
        <h2 className="text-20 font-bold">정말 로그아웃하시겠어요?</h2>
        <div className="flex gap-4">
          <button className="rounded-xl border-2 p-[10px]">네</button>
          <button
            className="rounded-xl border-2 border-Blue-500 p-[10px]"
            onClick={() => closeModal()}
          >
            아니요
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
