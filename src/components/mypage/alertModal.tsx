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
      <div>정말 로그아웃하시겠어요?</div>
      <button onClick={handleLogout}>로그아웃 하기</button>
    </Modal>
  );
};

export default AlertModal;
