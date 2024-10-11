import { User } from './accounts';

export interface Member {
  id: number;
  user: User;
}

export interface ChatRoomType {
  uuid: string;
  name: string;
  owner: string | null;
  created_at: string;
  updated_at: string;
  members: Member[];
  first_message?: string;
}

export interface ChatRoomQuery {
  pages: Array<{
    results: ChatRoomType[];
    next: number | null;
  }>;
  pageParams: Array<{
    page: number;
    uuid: string;
  }>;
}

export interface ChatMessageType {
  member: number;
  text: string;
  created_at: string;
  room_id: string;
}

export interface ChatMessagesQuery {
  pages: Array<{
    results: ChatMessageType[];
    next: number | null;
  }>;
  pageParams: Array<{
    page: number;
    search: string;
  }>;
}
