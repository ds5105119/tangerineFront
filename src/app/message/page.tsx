'use client';

import { useChatRoomList } from '@/hooks/chats/chat';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from '@/lib/authToken';
import ChatRoomSkeleton from '@/components/chat/chatRoomSkeleton';
import TopSearchNav from '@/components/navBar/top-search-nav';
import ChatRoom from '@/components/chat/chatRoom';
import ChatRoomAds from '@/components/chat/chatRoomads';

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthType>();
  const { ref, inView } = useInView();
  const { chatRooms, error, isLoading, fetchNextPage, hasNextPage } = useChatRoomList({});

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
      <div className="flex flex-col flex-1 overflow-auto space-y-10 items-center sm:items-start lg:min-w-[28rem] lg:w-[28rem] lg:max-w-[28rem]">
        <TopSearchNav />
        <ChatRoomAds />
        <div className="w-full">
          {chatRooms?.map((value) => <ChatRoom key={value.uuid} chatRoom={value}></ChatRoom>)}
        </div>
        {isLoading && hasNextPage ? <ChatRoomSkeleton /> : <div ref={ref} />}
      </div>
    </main>
  );
}
