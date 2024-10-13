import { create } from 'zustand';
import { QueryClient, InfiniteData } from '@tanstack/react-query';
import { ChatMessageType, ChatMessagesQuery } from '@/types/api/chat';
import { getChatMessageList } from '@/hooks/chats/chatApi';

type WebSocketStore = {
  socket: WebSocket | null;
  connect: (queryClient: QueryClient) => void;
  disconnect: () => void;
  sendMessage: (message: ChatMessageType) => void;
  isConnected: boolean;
};

const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  connect: (queryClient: QueryClient) => {
    if (!get().socket) {
      const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_CHATS_URL}`);

      socket.onopen = () => {
        set({ isConnected: true });
        console.log('연결시작함');
      };
      socket.onclose = () => set({ isConnected: false });
      socket.onerror = (error) => {
        set({ isConnected: false });
        console.log(error);
      };
      socket.onmessage = (event) => {
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

      set({ socket });
    }
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, isConnected: false });
    }
  },
  sendMessage: (message: ChatMessageType) => {
    const { socket } = get();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: message }));
    } else {
      console.error('WebSocket is not connected');
    }
  },
  isConnected: false,
}));

export default useWebSocketStore;
