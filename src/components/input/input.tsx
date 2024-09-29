import { InputHTMLAttributes } from 'react';

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => {
  return (
    <input
      className={`appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-700 focus:border-gray-500 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus-visible:ring-0 text-sm ${className}`}
      {...props}
    />
  );
};

export default Input;
