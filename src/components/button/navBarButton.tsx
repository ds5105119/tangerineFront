import React from 'react';

type NavBarButtonProps = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const NavBarButton: React.FC<NavBarButtonProps> = ({ onClick, className = '', children }) => {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-250 ${className}`}
    >
      <div className="inline-flex items-center justify-center p-3 rounded-md text-black dark:text-gray-100 hover:text-gray-600 dark:hover:text-white transition duration-300">
        {children}
      </div>
    </button>
  );
};

export default NavBarButton;
