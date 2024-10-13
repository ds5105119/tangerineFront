'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useChatRoomList } from '@/hooks/chats/chat';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from '@/lib/authToken';
import { ChatRoomListProps } from './types';
import { Suspense } from 'react';
import ChatRoom from './chatRoom';
import ChatRoomSkeleton from './chatRoomSkeleton';

const ChatRoomList = ({ ordering, search, resize }: ChatRoomListProps) => {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthType>();
  const { ref: chatRoomRef, inView: chatRoomInView } = useInView();

  const {
    chatRooms,
    isLoading: chatRoomIsLoading,
    fetchNextPage: chatRoomFetchNextPage,
    hasNextPage: chatRoomHasNextPage,
  } = useChatRoomList({ ordering, search });

  useEffect(() => {
    const authData = getAuth();
    if (authData) {
      setAuth(authData);
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (chatRoomInView && auth) {
      chatRoomFetchNextPage();
    }
  }, [chatRoomInView]);

  return (
    <div className="h-full w-full">
      <Suspense fallback={<ChatRoomSkeleton />}>
        {chatRooms?.map((value) => <ChatRoom key={value.uuid} chatRoom={value} resize={resize} auth={auth}></ChatRoom>)}
        {chatRoomIsLoading && chatRoomHasNextPage ? <ChatRoomSkeleton /> : <div ref={chatRoomRef} />}
      </Suspense>
    </div>
  );
};

export default ChatRoomList;
