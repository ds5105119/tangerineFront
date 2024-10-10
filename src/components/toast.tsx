'use client';

import React, { useEffect } from 'react';

interface ToastType {
  message: string;
  onClose: () => void;
}

const Toast = ({ message, onClose }: ToastType) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 dark:bg-gray-500 text-white dark:text-white text-pretty text-center text-sm py-4 px-8 rounded-full shadow-md">
      {message}
    </div>
  );
};

export default Toast;
