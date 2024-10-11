import { ChatRoomType } from '@/types/api/chat';
import { UseChatRoomListProps } from '@/hooks/chats/chat';

export interface ChatRoomProps {
  chatRoom: ChatRoomType;
  resize: boolean;
}

export interface ChatRoomListProps extends UseChatRoomListProps {
  resize: boolean;
}

export interface ChatRoomSkeletonProps {
  itemCount?: number;
}
