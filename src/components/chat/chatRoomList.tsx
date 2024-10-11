'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useChatRoomList } from '@/hooks/chats/chat';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from '@/lib/authToken';
import { ChatRoomListProps } from './types';
import ChatRoom from './chatRoom';
import ChatRoomAds from './chatRoomAds';
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
      <ChatRoomAds />
      {chatRooms?.map((value) => <ChatRoom key={value.uuid} chatRoom={value} resize={resize}></ChatRoom>)}
      {chatRoomIsLoading && chatRoomHasNextPage ? <ChatRoomSkeleton /> : <div ref={chatRoomRef} />}
    </div>
  );
};

export default ChatRoomList;
