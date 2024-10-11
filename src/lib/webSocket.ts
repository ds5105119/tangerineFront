import { create } from 'zustand';

type WebSocketStore = {
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
};

export const useWebSocketStore = create<WebSocketStore>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
}));
