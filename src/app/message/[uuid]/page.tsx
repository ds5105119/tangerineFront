'use client';

import { useChatRoom, useChatRoomList, useChatMessages } from '@/hooks/chats/chat';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from '@/lib/authToken';
import { useWebSocket } from '@/hooks/chats/useWebSocket';
import ChatRoomSkeleton from '@/components/chat/chatRoomSkeleton';
import TopSearchNav from '@/components/navBar/top-search-nav';
import ChatRoom from '@/components/chat/chatRoom';
import ChatRoomAds from '@/components/chat/chatRoomads';
import ChatInput from '@/components/input/chatInput';

export default function Home() {
  const router = useRouter();
  const [memberId, setMemberId] = useState<number>();
  const [auth, setAuth] = useState<AuthType>();
  const { uuid } = useParams();
  const { ref: chatRoomRef, inView: chatRoomInView } = useInView();
  const { sendMessage, messages, isConnected, error } = useWebSocket(uuid as string);
  const {
    chatRooms,
    error: chatRoomError,
    isLoading: chatRoomIsLoading,
    fetchNextPage: chatRoomFetchNextPage,
    hasNextPage: chatRoomHasNextPage,
  } = useChatRoomList({});
  const {
    chatMessages,
    error: messageError,
    isLoading: messageIsLoading,
    fetchNextPage: messageFetchNextPage,
    hasNextPage: messageHasNextPage,
  } = useChatMessages(uuid as string);
  const { data: chatRoom } = useChatRoom(uuid as string);

  useEffect(() => {
    const tempAuth = getAuth();
    if (tempAuth) {
      setAuth(tempAuth);
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (chatRoomInView && auth) {
      chatRoomFetchNextPage();
    }
  }, [chatRoomInView]);

  useEffect(() => {
    if (chatRoomInView && auth) {
      messageFetchNextPage();
    }
  }, [chatRoomInView]);

  useEffect(() => {
    const userSelf = chatRoom?.members.filter((value) => value.user.handle == auth?.user.handle);
    console.log(userSelf);
    if (userSelf) {
      setMemberId(userSelf[0]?.id);
    }
  }, [chatRoom]);

  return (
    <main className="flex h-screen w-full">
      <div className="flex-1 overflow-auto space-y-10 items-center sm:items-start hidden lg:flex lg:flex-col lg:min-w-[28rem] lg:w-[28rem] lg:max-w-[28rem]">
        <TopSearchNav />
        <ChatRoomAds />
        <div className="w-full">
          {chatRooms?.map((value) => <ChatRoom key={value.uuid} chatRoom={value}></ChatRoom>)}
        </div>
        {chatRoomIsLoading && chatRoomHasNextPage ? <ChatRoomSkeleton /> : <div ref={chatRoomRef} />}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col-reverse overflow-auto">
          {chatMessages?.map((value, index) => <div key={index}>{value.text}</div>)}
        </div>
        {isConnected && memberId ? <ChatInput sendMessage={sendMessage} memberid={memberId} /> : <></>}
      </div>
    </main>
  );
}
