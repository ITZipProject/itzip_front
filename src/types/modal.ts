export interface SignInModalProps {
  modalId: string;
}

export type ModalType = {
  isOpen: boolean;
  id: string | null;
};

export interface ModalProps {
  modalId: string;
  children: React.ReactNode;
}

export interface ModalContextProps {
  openModals: string[];
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
}

export type ModalName = {
  modalName: 'signUpModal' | 'emailLoginModal' | 'signUpEmailModal' | 'loginModal';
};
