'use client';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface ModalContextType {
  openModals: string[];
  openModal: (modalId: string) => void;
  closeModal: () => void;
  prevModal: string | null;
  prevModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [openModals, setOpenModals] = useState<string[]>([]);
  const [prevModal, setPrevModal] = useState<string | null>(null);

  const openModal = (modalId: string) => {
    if (openModals.length > 0) {
      setPrevModal(openModals[0]);
    }
    setOpenModals([modalId]);
  };

  const closeModal = () => {
    setOpenModals([]);
    setPrevModal(null);
  };

  const prevModals = () => {
    if (prevModal) {
      openModal(prevModal);
    }
  };

  return (
    <ModalContext.Provider value={{ openModals, openModal, closeModal, prevModal, prevModals }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
