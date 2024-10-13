import { Profile } from './profiles';

export interface User {
  handle: string;
  username: string;
  profile: Profile;
  created_at: string; // ISO 형식의 날짜 문자열
  updated_at: string; // ISO 형식의 날짜 문자열
  is_public: boolean;
  follows_count: number;
  followers_count: number;
  is_following?: boolean;
  is_follower?: boolean;
}

export interface UpdateAbleUser {
  handle?: string;
  username?: string;
  profile?: {
    bio?: string;
    link_1?: string;
    link_2?: string;
    profile_image?: string;
  };
}

export interface AuthUser {
  profile: {
    bio: string;
    link_1: string;
    link_2: string;
    profile_image: string;
  };
  username: string;
  handle: string;
  email: string;
}

export interface AuthType {
  access: string;
  refresh: string;
  user: AuthUser;
}

export interface UserQuery {
  pages: Array<{
    results: User[];
    next: number | null;
  }>;
  pageParams: Array<{
    page: number;
    search: string;
  }>;
}
