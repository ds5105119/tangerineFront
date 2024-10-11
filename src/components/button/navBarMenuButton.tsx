import React, { useState, useRef, useEffect } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AuthType } from '@/types/api/accounts';
import NavBarMenu from './navBarMenu';

interface NavBarMenuButtonProps {
  auth: AuthType | null;
  className: string;
}

const NavBarMenuButton = ({ auth, className }: NavBarMenuButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleMenu}
      className={`relative group inline-flex items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-250 ${className}`}
    >
      <div className="inline-flex items-center justify-center p-3 rounded-md text-black dark:text-gray-100 hover:text-gray-600 dark:hover:text-white transition duration-300">
        <span className="sr-only">메뉴 버튼</span>
        <NavBarMenu auth={auth} toggle={isOpen} ref={menuRef} />
        <HiMenuAlt3 className="cursor-pointer w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
      </div>
    </button>
  );
};

export default NavBarMenuButton;
