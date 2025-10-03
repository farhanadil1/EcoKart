import React from 'react';
import { FiX } from 'react-icons/fi';

const CustomAlert = ({ title, message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50 bg-primary text-white px-4 py-2 rounded shadow-lg w-[400px]">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-sm mt-1">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          <FiX size={20} />
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
