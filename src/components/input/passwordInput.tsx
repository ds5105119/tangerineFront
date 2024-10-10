'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import { IoEye } from 'react-icons/io5';
import { IoEyeOff } from 'react-icons/io5';

const PasswordInput: React.FC<InputHTMLAttributes<HTMLInputElement> & { type?: string }> = ({
  className = '',
  type = 'password',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        autoComplete="current-password"
        className={`appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black dark:placeholder-gray-700 focus:border-gray-500 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus-visible:ring-0 text-sm ${className}`}
        {...props}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
        >
          {showPassword ? <IoEyeOff className="h-4 w-4" /> : <IoEye className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
