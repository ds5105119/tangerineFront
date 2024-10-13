'use client';

import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getAuth } from '@/lib/authToken';
import useWebSocketStore from '@/lib/webSocket';

const useWebSocket = () => {
  const queryClient = useQueryClient();
  const { connect, disconnect, sendMessage, isConnected } = useWebSocketStore();

  const reconnect = useCallback(() => {
    disconnect();
    connect(queryClient);
  }, [disconnect, connect, queryClient]);

  useEffect(() => {
    const auth = getAuth();
    if (auth && !isConnected) {
      connect(queryClient);
    }

    return () => {};
  }, []);

  return { sendMessage, reconnect, isConnected };
};

export default useWebSocket;
