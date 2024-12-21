'use client';

import Modal from '@/components/portal/modal';
import useUser from '@/hooks/mypage/useUser';
import { useModal } from '@/lib/context/ModalContext';
import { tokenAtom } from '@/store/useTokenStore';
import { useAtom } from 'jotai';

interface SignInModalProps {
  modalId: string;
}

const AlertModal: React.FC<SignInModalProps> = ({ modalId }: SignInModalProps) => {
  const { openModals, closeModal } = useModal();
  const [token] = useAtom(tokenAtom);
  const { user, userLogout } = useUser(token.accessToken ?? '');
  // 모달이 열려 있는 경우에만 렌더링
  if (!openModals.includes(modalId)) return null;

  const handleLogout = () => {
    // clearToken();
    userLogout();
  };

  return (
    <Modal isOpen={true} onClose={() => closeModal()}>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[20px]">정말 로그아웃하시겠어요?</h2>
        <div className="flex gap-4">
          <button className="border-2 p-[10px] rounded-xl" onClick={handleLogout}>
            네
          </button>
          <button
            className="border-2 p-[10px] rounded-xl border-Blue-500"
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
