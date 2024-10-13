import axiosInstance from '@/lib/axiosInstance';
import { ChatRoomType, ChatMessageType, CreateChatRoomType } from '@/types/api/chat';

export interface GetChatRoomListProps {
  page?: number;
  search?: string;
}

export interface GetChatMessageListProps {
  page?: number;
  uuid?: string;
}

export interface UpdateChatRoomProps {
  name?: string;
  handles: string[];
}

export const getChatRoomList = async ({
  page = 1,
  search,
}: GetChatRoomListProps): Promise<{ results: ChatRoomType[]; next: number | null }> => {
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

export const createChatRoom = async ({ handles }: CreateChatRoomType): Promise<ChatRoomType> => {
  try {
    const { data } = await axiosInstance.post(`${process.env.NEXT_PUBLIC_CHATS_ROOMS_URL}`, {
      handles,
    });

    return data;
  } catch (error) {
    console.error('Error creating chat room:', error);
    throw error;
  }
};

export const updateChatRoom = async ({ name, handles }: UpdateChatRoomProps): Promise<ChatRoomType> => {
  try {
    const { data } = await axiosInstance.patch(`${process.env.NEXT_PUBLIC_CHATS_ROOMS_URL}`, {
      name,
      handles,
    });

    return data;
  } catch (error) {
    console.error('Error creating chat room:', error);
    throw error;
  }
};

export const deleteChatRoom = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${process.env.NEXT_PUBLIC_CHATS_ROOMS_URL}${uuid}`);
  } catch (error) {
    console.error('Error deleting chat room:', error);
    throw error;
  }
};

export const getChatMessageList = async ({
  page = 1,
  uuid,
}: GetChatMessageListProps): Promise<{ results: ChatMessageType[]; next: number | null }> => {
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

export const deleteChatRooomUser = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${process.env.NEXT_PUBLIC_CHATS_ROOMS_URL}members/${uuid}`);
  } catch (error) {
    console.error('Error deleting chat room:', error);
    throw error;
  }
};
