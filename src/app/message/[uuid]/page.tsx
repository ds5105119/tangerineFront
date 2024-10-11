'use client';

import { useChatRoom } from '@/hooks/chats/chat';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from '@/lib/authToken';
import useWebSocket from '@/hooks/chats/useWebSocket';
import ChatRoomList from '@/components/chat/chatRoomList';
import ChatMessageList from '@/components/chat/chatMessageList';
import ChatInput from '@/components/input/chatInput';
import Toast from '@/components/toast';
import TopRoomNav from '@/components/navBar/top-room-nav';

export default function Home() {
  const router = useRouter();
  const [memberId, setMemberId] = useState<number>();
  const [auth, setAuth] = useState<AuthType>();
  const [showToast, setShowToast] = useState<string>('');
  const { uuid } = useParams();
  const { isConnected, isError, sendMessage } = useWebSocket();
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
    if (chatRoom && auth) {
      const userSelf = chatRoom.members.find((value) => value.user.handle === auth.user.handle);
      if (userSelf) {
        setMemberId(userSelf.id);
      }
    }
  }, [chatRoom, auth]);

  useEffect(() => {
    if (isError) {
      setShowToast('오류가 발생하였습니다.');
    }
  }, [isError]);

  return (
    <main className="flex w-full h-full">
      <div className="flex flex-col overflow-y-auto space-y-10 items-center w-fit lg:min-w-[28rem] lg:w-[28rem] lg:max-w-[28rem] scroll-smooth md:scroll-auto border-r-[1px] border-gray-100 dark:border-r-2 dark:border-gray-700">
        <TopRoomNav />
        <ChatRoomList resize={true} />
      </div>
      <div className="flex flex-col flex-1">
        <ChatMessageList />
        {isConnected && memberId ? <ChatInput sendMessage={sendMessage} memberid={memberId} /> : <></>}
      </div>
      {showToast && <Toast message={showToast} onClose={() => setShowToast('')} />}
    </main>
  );
}
