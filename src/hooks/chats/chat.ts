import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { ChatMessageType, ChatRoomType } from '@/types/api/chat';
import { CreateChatRoomType } from '@/types/api/chat';
import {
  GetChatRoomListProps,
  GetChatMessageListProps,
  createChatRoom,
  getChatRoomList,
  getChatMessageList,
} from './chatApi';
import axiosInstance from '@/lib/axiosInstance';

export interface UseChatRoomListProps {
  ordering?: string;
  search?: string;
}

export const useChatRoom = (uuid: string) => {
  return useQuery<ChatRoomType, Error>({
    queryKey: ['chatRoom', uuid],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<ChatRoomType>(`${process.env.NEXT_PUBLIC_CHATS_URL}rooms/${uuid}/`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useCreateChatRoom = () => {
  return useMutation<ChatRoomType, Error, CreateChatRoomType>({
    mutationFn: createChatRoom,
    onError: (error) => {
      console.error('채팅방 생성 오류:', error);
    },
  });
};

export const useChatMessages = (uuid: string) => {
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { results: ChatMessageType[]; next: number | null },
    Error
  >({
    refetchInterval: 1000 * 100,
    queryKey: ['chatMessages', uuid],
    queryFn: ({ pageParam }) => getChatMessageList(pageParam as GetChatMessageListProps),
    initialPageParam: { page: 1, uuid: uuid },
    getNextPageParam: (lastPage) => (lastPage.next ? { page: lastPage.next, uuid } : undefined),
  });

  return {
    chatMessages: data?.pages.flatMap((page) => page.results),
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};

export const useChatRoomList = ({ ordering, search }: UseChatRoomListProps) => {
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { results: ChatRoomType[]; next: number | null },
    Error
  >({
    refetchInterval: 1000 * 10,
    queryKey: ['chatRoomList', ordering, search],
    queryFn: ({ pageParam }) => getChatRoomList(pageParam as GetChatRoomListProps),
    initialPageParam: { page: 1, search: search },
    getNextPageParam: (lastPage) => (lastPage.next ? { page: lastPage.next, search } : undefined),
  });

  return {
    chatRooms: data?.pages.flatMap((page) => page.results),
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
