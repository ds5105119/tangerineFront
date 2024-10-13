import { ChatRoomType } from '@/types/api/chat';
import { UseChatRoomListProps } from '@/hooks/chats/chat';
import { AuthType } from '@/types/api/accounts';

export interface ChatRoomProps {
  chatRoom: ChatRoomType;
  resize: boolean;
  auth: AuthType | undefined;
}

export interface ChatRoomListProps extends UseChatRoomListProps {
  resize: boolean;
}

export interface ChatRoomSkeletonProps {
  itemCount?: number;
}
