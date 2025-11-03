import React from 'react';
import { FiX } from 'react-icons/fi';

const CustomAlert = ({ title, message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50 bg-primary text-white px-4 py-3 rounded shadow-lg 
                    w-full max-w-sm sm:max-w-md md:max-w-lg">
      <div className="flex justify-between items-start">
        <div className="pr-2">
          <h4 className="font-semibold text-base sm:text-lg">{title}</h4>
          <p className="text-xs sm:text-sm mt-1">{message}</p>
        </div>
        <button onClick={onClose} className="ml-2 text-white hover:text-gray-200 flex-shrink-0">
          <FiX size={20} />
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
