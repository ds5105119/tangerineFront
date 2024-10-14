import React, { forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { IoLogOutOutline, IoLogInOutline, IoSettingsOutline } from 'react-icons/io5';
import { PiSealWarning } from 'react-icons/pi';
import { logout } from '@/hooks/accounts/account';
import { AuthType } from '@/types/api/accounts';
import MenuButton from './menuButton';

export interface navBarMenuProps {
  auth: AuthType | undefined;
  toggle: boolean;
}

const NavBarMenu = forwardRef<HTMLDivElement, navBarMenuProps>((props, ref) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSetting = () => {
    router.push('/accounts/edit');
  };

  const handleReport = () => {
    router.push('report');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    const isLogout = logout();
    if (isLogout) {
      queryClient.clear();
      queryClient.cancelQueries();
      alert('로그아웃 되었습니다.');
    }
  };

  return (
    <div
      ref={ref}
      className={`absolute z-10 top-[-12.5rem] left-[0.1rem] py-2 min-w-60 bg-white opacity-95 shadow-primary dark:shadow-dark rounded-2xl text-black ${props.toggle ? 'flex flex-col space-y-1' : 'hidden'}`}
    >
      <MenuButton
        className="bg-white hover:opacity-100 hover:bg-gray-100 active:bg-gray-200 mx-2"
        onClick={handleSetting}
      >
        <IoSettingsOutline className="w-6 h-6" />
        <div className="font-bold text-lg">설정</div>
      </MenuButton>
      <MenuButton
        className="bg-white hover:opacity-100 hover:bg-gray-100 active:bg-gray-200 mx-2"
        onClick={handleReport}
      >
        <PiSealWarning className="w-6 h-6" />
        <div className="font-bold text-lg">신고</div>
      </MenuButton>
      <div />
      <hr className="h-px bg-gray-200 border-0" />
      <div />
      {!!props.auth ? (
        <MenuButton
          className="bg-white hover:opacity-100 hover:bg-gray-100 active:bg-gray-200 mx-2"
          onClick={handleLogout}
        >
          <IoLogOutOutline className="w-6 h-6" />
          <div className="font-bold text-lg">로그아웃</div>
        </MenuButton>
      ) : (
        <MenuButton
          className="bg-white hover:opacity-100 hover:bg-gray-100 active:bg-gray-200 mx-2"
          onClick={handleLogin}
        >
          <IoLogInOutline className="w-6 h-6" />
          <div className="font-bold text-lg">로그인</div>
        </MenuButton>
      )}
    </div>
  );
});

NavBarMenu.displayName = 'NavBarMenu';

export default NavBarMenu;
