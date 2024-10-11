'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from '@/lib/authToken';
import { authUserToUser } from '@/lib/accounts';
import AccountMenu from '@/components/account/accountMenu';
import Button from '@/components/button/button';
import Profile from '@/components/user/profile';

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthType>();
  const { ref, inView } = useInView();

  useEffect(() => {
    const tempAuth = getAuth();
    if (tempAuth) {
      setAuth(tempAuth);
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <main className="flex w-full h-full">
      <div className="overflow-auto space-y-10 items-center hidden lg:flex lg:flex-col lg:min-w-[28rem] lg:w-[28rem] lg:max-w-[28rem] border-r-[1px] border-gray-100 dark:border-r-2 dark:border-gray-700">
        <div className="text-3xl font-extrabold w-full px-7 pt-20">설정</div>
        <AccountMenu />
      </div>
      <div className="flex flex-col w-full h-full px-40 pt-20 space-y-10">
        <div className="text-2xl font-extrabold w-full">프로필 편집</div>
        <div className="flex items-center px-6 py-4 rounded-2xl justify-between bg-gray-100 dark:bg-gray-700">
          <div className="flex items-center space-x-5">
            <Profile user={authUserToUser(auth?.user)} className="w-18 h-18" />
            <div className="text-xl font-extrabold">{auth?.user.handle}</div>
          </div>
          <div className="min-w-28">
            <Button size={'sm'} colorScheme={'default'}>
              Handle 변경
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
