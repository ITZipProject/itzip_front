import React, { createContext, useState, useContext, useCallback } from 'react';

interface Modal {
  id: string;
  content: React.ReactNode;
}

interface ModalContextType {
  openModal: (id: string, content: React.ReactNode) => void;
  closeModal: (id: string) => void;
  isOpen: (id: string) => boolean;
  getContent: (id: string) => React.ReactNode | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = useCallback((id: string, content: React.ReactNode) => {
    setModals((prev) => [...prev, { id, content }]);
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const isOpen = useCallback((id: string) => modals.some((modal) => modal.id === id), [modals]);

  const getContent = useCallback(
    (id: string) => modals.find((modal) => modal.id === id)?.content || null,
    [modals]
  );

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, getContent }}>
      {children}
      {modals.map((modal) => (
        <div key={modal.id}>{modal.content}</div>
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};