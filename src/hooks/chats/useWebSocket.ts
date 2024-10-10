import { useState, useEffect } from 'react';
import { ChatMessageType, WebsocketMessage } from '@/types/api/chat';

interface UseWebSocketOptions {
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

export function useWebSocket(uuid: string, options: UseWebSocketOptions = {}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>();
  const { reconnectAttempts = 3, reconnectInterval = 2000 } = options;

  const connect = () => {
    try {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_CHATS_URL}${uuid}/`);

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      ws.onclose = () => {
        setIsConnected(false);
      };

      ws.onerror = (event) => {
        setError('WebSocket error occurred');
        console.error('WebSocket error:', event);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as ChatMessageType;
          setMessages((prevMessages) => (prevMessages ? [data, ...prevMessages] : [data]));
        } catch (e) {
          console.error('Error parsing message:', e);
        }
      };

      setSocket(ws);
    } catch (err) {
      setError('Failed to create WebSocket connection');
      console.error('WebSocket creation error:', err);
      return null;
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [uuid]);

  const sendMessage = (message: WebsocketMessage) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return {
    sendMessage,
    messages,
    isConnected,
    error,
  };
}
