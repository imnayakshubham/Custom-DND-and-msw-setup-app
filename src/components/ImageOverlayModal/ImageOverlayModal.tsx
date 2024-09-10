import React, { useEffect } from 'react';

type ImageOverlayModalProps = {
    src: string;
    onClose: () => void;
};

const ImageOverlayModal: React.FC<ImageOverlayModalProps> = ({ src, onClose }) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <img src={src} alt="Overlay" className="max-w-full max-h-full" />
        </div>
    );
};

export default ImageOverlayModal;
