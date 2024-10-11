'use client';

import { useChatRoomList } from '@/hooks/chats/chat';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from '@/lib/authToken';
import useWebSocket from '@/hooks/chats/useWebSocket';
import ChatRoomList from '@/components/chat/chatRoomList';
import ChatRoomSkeleton from '@/components/chat/chatRoomSkeleton';
import TopRoomNav from '@/components/navBar/top-room-nav';

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthType>();
  const { ref, inView } = useInView();
  // eslint-disable-next-line
  const { chatRooms, error, isLoading, fetchNextPage, hasNextPage } = useChatRoomList({});
  // eslint-disable-next-line
  const { isConnected, isError, sendMessage } = useWebSocket();

  useEffect(() => {
    const tempAuth = getAuth();
    if (tempAuth) {
      setAuth(tempAuth);
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (inView && auth) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main className="flex w-full h-full">
      <div className="flex flex-col flex-1 overflow-auto space-y-10 items-center sm:items-start lg:min-w-[28rem] lg:w-[28rem] lg:max-w-[28rem] border-r-[1px] border-gray-100 dark:border-r-2 dark:border-gray-700">
        <div className="hidden lg:flex lg:w-full">
          <TopRoomNav />
        </div>
        <ChatRoomList resize={false} />
        {isLoading && hasNextPage ? <ChatRoomSkeleton /> : <div ref={ref} />}
      </div>
    </main>
  );
}
