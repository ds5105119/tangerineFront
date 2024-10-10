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
  first_message: string;
}

export interface ChatMessageType {
  member: number;
  text: string;
  created_at: string;
}

export interface WebsocketMessage {
  message: ChatMessageType;
}
