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
  const [reconnectCount, setReconnectCount] = useState<number>(0);
  const { uuid } = useParams();
  const { sendMessage, reconnect, isConnected } = useWebSocket();
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
    const maxReconnectAttempts = 10;

    if (!isConnected) {
      const attemptReconnect = async () => {
        if (!isConnected && reconnectCount < maxReconnectAttempts) {
          const reconnectTimer = setTimeout(() => {
            setReconnectCount((prev) => prev + 1);
            reconnect();
          }, 3000);
          return () => clearTimeout(reconnectTimer);
        } else {
          setShowToast('서버에 연결하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        }
      };
      attemptReconnect();
    }
  }, [isConnected]);

  return (
    <main className="flex w-full h-full">
      <div className="flex flex-col overflow-y-auto space-y-10 items-center w-fit lg:min-w-[28rem] lg:w-[28rem] lg:max-w-[28rem] overflow-x-hidden scroll-smooth md:scroll-auto border-r-[1px] border-gray-100 dark:border-r-2 dark:border-gray-700">
        <div className="hidden lg:flex lg:flex-col lg:w-full space-y-10">
          <div className="mt-10 px-8 text-2xl font-extrabold">Message</div>
          <TopRoomNav />
        </div>
        <ChatRoomList resize={true} />
      </div>
      <div className="flex flex-col flex-1">
        <ChatMessageList />
        {memberId ? <ChatInput sendMessage={sendMessage} memberid={memberId} /> : <></>}
      </div>
      {showToast && <Toast message={showToast} onClose={() => setShowToast('')} />}
    </main>
  );
}
