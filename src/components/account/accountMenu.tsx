'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FaRegUser, FaCircleInfo } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import MenuButton from '@/components/button/menuButton';

const AccountMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathname.split('/').pop();

  return (
    <div className="flex flex-col w-full px-6 space-y-3">
      <MenuButton
        className={`w-full h-24 space-x-5 justify-between ${currentPage == 'edit' ? 'bg-gray-200 dark:bg-gray-800' : ' cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700'}`}
        onClick={() => router.push('/accounts/edit')}
      >
        <div className="flex space-x-5 items-center">
          <FaRegUser className="w-6 h-6" />
          <div className="flex flex-col">
            <div className="text-base font-bold truncate">계정 설정</div>
            <div className="text-sm text-gray-500 select-none">
              계정의 정보를 확인하고, 프로필을 변경하거나 계정을 비활성화 합니다.
            </div>
          </div>
        </div>
        <IoIosArrowForward className="w-5 h-5 flex-shrink-0" />
      </MenuButton>
      <MenuButton
        className={`w-full h-24 space-x-5 justify-between ${currentPage == 'about' ? 'bg-gray-200 dark:bg-gray-800' : ' cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700'}`}
        onClick={() => router.push('/accounts/about')}
      >
        <div className="flex space-x-5 items-center">
          <FaCircleInfo className="w-6 h-6" />
          <div className="flex flex-col">
            <div className="text-base font-bold truncate">Tangerine</div>
            <div className="text-sm text-gray-500 select-none">Tangerine에 대해여 알아보세요.</div>
          </div>
        </div>
        <IoIosArrowForward className="w-5 h-5 flex-shrink-0" />
      </MenuButton>
    </div>
  );
};

export default AccountMenu;
