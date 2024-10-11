'use client';

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useChatMessages, useChatRoom } from '@/hooks/chats/chat';
import { AuthType } from '@/types/api/accounts';
import { ChatMessageType } from '@/types/api/chat';
import { getAuth } from '@/lib/authToken';
import ChatMessage from './chatMessage';

const ChatMessageList = () => {
  const router = useRouter();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [auth, setAuth] = useState<AuthType>();
  const [lastMessage, setLastMessage] = useState<ChatMessageType>();
  const [selfMemberId, setSelfMemberId] = useState<number>();
  const { uuid } = useParams();
  const { ref: chatMessageRef, inView: chatMessageInView } = useInView();

  const {
    chatMessages,
    error: messageError,
    isLoading: messageIsLoading,
    fetchNextPage: messageFetchNextPage,
    hasNextPage: messageHasNextPage,
  } = useChatMessages(uuid as string);
  const { data: chatRoom } = useChatRoom(uuid as string);

  useEffect(() => {
    const authData = getAuth();
    if (authData) {
      setAuth(authData);
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (chatMessageInView && auth) {
      messageFetchNextPage();
    }
  }, [chatMessageInView]);

  useEffect(() => {
    const memberId = chatRoom?.members.filter((val) => val.user.handle === auth?.user.handle)[0]?.id;
    const message = chatMessages ? chatMessages[0] : null;
    if (memberId) {
      setSelfMemberId(memberId);
    }
    if (message && message != lastMessage) {
      setLastMessage(message);
    }
  }, [chatMessages, chatRoom]);

  useEffect(() => {
    if (lastMessage && lastMessage.member == selfMemberId) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastMessage]);

  return (
    <div className="flex flex-col-reverse h-full space-y-[0.3rem] p-4 overflow-auto scroll-smooth md:scroll-auto">
      <div ref={messageEndRef} />
      {chatMessages?.map((message, index) => (
        <ChatMessage
          key={index}
          isOwn={message.member == selfMemberId}
          isConsecutive={(index > 0 ? chatMessages[index - 1].member : chatMessages[1].member) == message.member}
          time={message.created_at}
        >
          {message.text}
        </ChatMessage>
      ))}
      <div ref={chatMessageRef} />
    </div>
  );
};

export default ChatMessageList;
