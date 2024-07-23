import { useEffect, useRef } from 'react';

function createPortalContainer(): HTMLDivElement {
    const portalContainer = document.createElement('div');
    portalContainer.style.position = 'fixed';
    portalContainer.style.top = '0';
    portalContainer.style.left = '0';
    portalContainer.style.width = '100%';
    portalContainer.style.height = '100%';
    portalContainer.style.zIndex = '100%';
    return portalContainer;
}

export const usePortal = (): HTMLDivElement => {
    const portalContainerRef = useRef<HTMLDivElement | null>(null);

    if (!portalContainerRef.current) {
        portalContainerRef.current = createPortalContainer();
    }

    useEffect(() => {
        if (portalContainerRef.current) {
            document.body.appendChild(portalContainerRef.current);
        }
        return () => {
            if (portalContainerRef.current) {
                document.body.removeChild(portalContainerRef.current);
            }
        };
    }, []);
    return portalContainerRef.current;
};
