
import React from 'react';

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] p-4"
        onClick={e => e.stopPropagation()}
      >
        <img 
          src={imageUrl} 
          alt="Zoomed view" 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-opacity-75 transition-colors"
          aria-label="Close image view"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
