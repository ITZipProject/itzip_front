'use client';

import { useEffect, useRef, useState } from 'react';

import Portal from './portal';

interface Position {
  top: number;
  left: number;
}

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const Dropdown = ({ isOpen, onClose, trigger, children }: DropdownProps) => {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom,
          left: rect.left,
        });
      }
    };

    const handleResize = () => {
      // screen width가 570 이상일 경우 (모바일 사이즈가 아닐 경우)
      if (window.innerWidth >= 570 && isOpen) {
        onClose();
      }
      updatePosition();
    };

    updatePosition();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        dropdownRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      <div ref={triggerRef}>{trigger}</div>
      {isOpen && window.innerWidth < 570 && (
        <Portal containerId="dropdown-root">
          <div
            ref={dropdownRef}
            className="absolute z-40"
            style={{
              top: `${position.top - 5}px`,
              left: `${position.left}px`,
              position: 'absolute',
            }}
          >
            <div className="mt-1 w-[100px] rounded-b-radius-05 border bg-white p-2 shadow-lg">
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Dropdown;
