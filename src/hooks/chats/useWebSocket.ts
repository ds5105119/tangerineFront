'use client';

import { useState, useEffect } from 'react';
import { ChatMessageType, ChatMessagesQuery } from '@/types/api/chat';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { useWebSocketStore } from '@/lib/webSocket';
import { getChatMessageList } from './chatApi';

const useWebSocket = () => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Event>();
  const { socket, setSocket } = useWebSocketStore();

  useEffect(() => {
    if (!socket) {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_CHATS_URL}`);

      ws.onmessage = (event) => {
        console.log(event.data);
        const data = JSON.parse(event.data);
        const uuid = data.message.room_id;
        const chatMessages = queryClient.getQueryData<InfiniteData<ChatMessagesQuery>>(['chatMessages', uuid]);

        if (chatMessages) {
          queryClient.setQueryData<InfiniteData<ChatMessagesQuery>>(['chatMessages', uuid], (oldData) => {
            if (oldData) {
              // eslint-disable-next-line
              const newPages = oldData.pages.map((page: any, index: number) => {
                if (index === 0) {
                  return {
                    results: [data.message, ...page.results],
                  };
                }
                return page;
              });

              return {
                pages: newPages,
                pageParams: oldData.pageParams,
              };
            } else {
              return oldData;
            }
          });
        } else {
          getChatMessageList({ uuid }).then((val) =>
            queryClient.setQueryData(['chatMessages', uuid], {
              pages: [val],
              pageParams: [{ page: 1, uuid: uuid }],
            })
          );
        }
      };

      ws.onopen = () => {
        setIsConnected(true);
      };

      ws.onerror = (error) => {
        setIsConnected(false);
        setIsError(true);
        setError(error);
      };

      ws.onclose = () => {
        console.log('왜닫힘?');
        setIsConnected(false);
        setSocket(null);
      };

      setSocket(ws);
    } else {
      setIsConnected(true);
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.onclose = null;
      } else if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [socket, setSocket]);

  const sendMessage = (message: ChatMessageType) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: message }));
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return { isConnected, isError, error, sendMessage };
};

export default useWebSocket;
