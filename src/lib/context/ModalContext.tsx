'use client';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface ModalContextType {
    openModals: string[];
    openModal: (modalId: string) => void;
    closeModal: (modalId: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [openModals, setOpenModals] = useState<string[]>([]);

    const openModal = (modalId: string) => {
        setOpenModals((prevModals) => [...prevModals, modalId]);
    };
    const closeModal = (modalId: string) => {
        setOpenModals((prevModals) => prevModals.filter((id) => id !== modalId));
    };

    return (
        <ModalContext.Provider value={{ openModals, openModal, closeModal }}>
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
