'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaCompass, FaRegCompass, FaPlus } from 'react-icons/fa6';
import { FaPaperPlane, FaRegPaperPlane } from 'react-icons/fa';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { RiCommandFill } from 'react-icons/ri';
import { authUserToUser } from '@/lib/accounts';
import usePostingStore from '@/lib/posting';
import Profile from '@/components/user/profile';
import NavBarButton from '@/components/button/navBarButton';
import Logo from '@/assets/svg/logo.svg';
import NavBarMenuButton from '@/components/button/navBarMenuButton';
import useAuthStore from '@/lib/auth';

const DefaultNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const openPosting = usePostingStore((state) => state.openPosting);
  const [profile, setProfile] = useState<string>('/login');
  const [firstPath, setFirstPath] = useState<string>('unknown');
  const { auth, setAuth } = useAuthStore();

  const toggleExploreTab = () => {
    router.push('/explore');
  };
  const toggleHomeTab = () => {
    router.push('/');
  };
  const toggleSearchTab = () => {
    router.push('/search');
  };
  const toggleMessageTab = () => {
    router.push('/message');
  };
  const togglePostTab = () => {
    openPosting();
  };
  const toggleProfileTab = () => {
    router.push(profile);
  };

  useEffect(() => {
    setAuth();
    if (auth) {
      setProfile(`/${auth.user?.handle}`);
    }
    if (!pathname || pathname === '/') {
      setFirstPath('');
    } else {
      setFirstPath(pathname.split('/').filter(Boolean)[0]);
    }
  }, [pathname]);

  return (
    <nav className="h-screen w-24 shadow-primary hidden lg:block dark:shadow-dark">
      <div className="h-full mx-auto px-5">
        <div className="flex flex-col h-full justify-between items-center">
          {/* Logo */}
          <div className="flex w-full mt-16 items-center justify-center">
            <button onClick={toggleHomeTab} type="button">
              <Logo className="w-6 h-6 fill-black dark:fill-white" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center space-y-4">
            <NavBarButton onClick={toggleProfileTab} className="w-20 h-14">
              <span className="sr-only">프로필 버튼</span>
              {firstPath == 'p' ? (
                <Profile
                  user={authUserToUser(auth?.user)}
                  priority={true}
                  className="cursor-pointer pointer-events-none border-gray-700 border-[2.5px] w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150"
                />
              ) : (
                <Profile
                  user={authUserToUser(auth?.user)}
                  priority={true}
                  className="cursor-pointer pointer-events-none border-gray-300 border-[2px] w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150"
                />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleHomeTab} className="w-20 h-14">
              <span className="sr-only">홈 버튼</span>
              {firstPath == '' ? (
                <GoHomeFill className="cursor-pointer w-[28px] h-[28px] group-hover:w-[30px] group-hover:h-[30px] transition-all duration-150" />
              ) : (
                <GoHome className="cursor-pointer w-[28px] h-[28px] stroke-[0.2px] group-hover:w-[30px] group-hover:h-[30px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleSearchTab} className="w-20 h-14">
              <span className="sr-only">탐색 버튼</span>
              {firstPath == 'search' ? (
                <RiCommandFill className="cursor-pointer w-[27px] h-[27px] stroke-[0.8px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
              ) : (
                <RiCommandFill className="cursor-pointer w-[27px] h-[27px] group-hover:w-[29px] group-hover:h-[29px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleExploreTab} className="w-20 h-14">
              <span className="sr-only">검색 버튼</span>
              {firstPath == 'explore' ? (
                <FaCompass className="cursor-pointer w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
              ) : (
                <FaRegCompass className="cursor-pointer w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={toggleMessageTab} className="w-20 h-14">
              <span className="sr-only">Message 버튼</span>
              {firstPath == 'message' ? (
                <FaPaperPlane className="cursor-pointer w-[23px] h-[23px] group-hover:w-[25px] group-hover:h-[25px] transition-all duration-150" />
              ) : (
                <FaRegPaperPlane className="cursor-pointer w-[23px] h-[23px] group-hover:w-[25px] group-hover:h-[25px] transition-all duration-150" />
              )}
            </NavBarButton>
            <NavBarButton onClick={togglePostTab} className="w-20 h-14">
              <span className="sr-only">포스팅 버튼</span>
              {firstPath == 'post' ? (
                <FaPlus className="cursor-pointer w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
              ) : (
                <FaPlus className="cursor-pointer w-[24px] h-[24px] group-hover:w-[26px] group-hover:h-[26px] transition-all duration-150" />
              )}
            </NavBarButton>
          </div>

          {/* Menu */}
          <NavBarMenuButton auth={auth} className="w-20 h-14 mb-16" />
        </div>
      </div>
    </nav>
  );
};

export default DefaultNavBar;
