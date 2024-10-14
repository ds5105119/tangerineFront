import { User } from './accounts';
export interface Reply {
  user: User;
  content: string;
  created_at: string;
}

export interface Comment {
  user: User;
  content: string;
  created_at: string;
  reply?: Reply | null;
  replys?: Reply[];
}

export interface uploadPostProps {
  category?: number;
  images?: string[];
  text: string;
  tags?: string[];
}

export interface Post {
  uuid: string;
  user: User;
  category: string;
  status: string;
  images: string[];
  text: string;
  tags: string[];
  views_count: number;
  likes_count: number;
  created_at: string;
  comments: Comment[];
}
