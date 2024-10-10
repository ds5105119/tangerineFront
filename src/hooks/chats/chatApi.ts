import axiosInstance from '@/lib/axiosInstance';
import { ChatRoomType, ChatMessageType } from '@/types/api/chat';

export interface GetChatRoomListParams {
  page?: number;
  search?: string;
}

export interface GetChatMessageListParams {
  page?: number;
  uuid?: string;
}

export const getChatRoomList = async ({
  page = 1,
  search,
}: GetChatRoomListParams): Promise<{ results: ChatRoomType[]; next: number | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_CHATS_ROOMS_URL}`, {
    params: {
      page: page,
      page_size: 20,
      search: search,
    },
  });

  return {
    results: data.results,
    next: data.next ? page + 1 : null,
  };
};

export const getChatMessageList = async ({
  page = 1,
  uuid,
}: GetChatMessageListParams): Promise<{ results: ChatMessageType[]; next: number | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_CHATS_MESSAGES_URL}${uuid}/messages`, {
    params: {
      page: page,
      page_size: 100,
    },
  });

  return {
    results: data.results,
    next: data.next ? page + 1 : null,
  };
};
