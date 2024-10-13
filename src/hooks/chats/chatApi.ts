import axiosInstance from '@/lib/axiosInstance';
import { ChatRoomType, ChatMessageType, CreateChatRoomType } from '@/types/api/chat';

export interface GetChatRoomListProps {
  cursor?: string | null;
  search?: string;
}

export interface GetChatMessageListProps {
  cursor?: string | null;
  uuid?: string;
}

export interface UpdateChatRoomProps {
  name?: string;
  handles: string[];
}

export const getChatRoomList = async ({
  cursor = null,
  search,
}: GetChatRoomListProps): Promise<{ results: ChatRoomType[]; next: string | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_CHATS_ROOMS_URL}`, {
    params: {
      cursor: cursor,
      page_size: 20,
      search: search,
    },
  });

  let nextCursor = null;
  if (data.next) {
    const parsedUrl = new URL(data.next);
    nextCursor = parsedUrl.searchParams.get('cursor');
  }

  return {
    results: data.results,
    next: nextCursor,
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
  cursor = null,
  uuid,
}: GetChatMessageListProps): Promise<{ results: ChatMessageType[]; next: string | null }> => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_CHATS_MESSAGES_URL}${uuid}/messages`, {
    params: {
      cursor: cursor,
      page_size: 50,
    },
  });

  let nextCursor = null;
  if (data.next) {
    const parsedUrl = new URL(data.next);
    nextCursor = parsedUrl.searchParams.get('cursor');
  }

  return {
    results: data.results,
    next: nextCursor,
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
