import { Profile } from './profiles';

export interface User {
  handle: string;
  username: string;
  profile: ProfileType;
  created_at: string; // ISO 형식의 날짜 문자열
  updated_at: string; // ISO 형식의 날짜 문자열
  is_public: boolean;
  follows_count: number;
  followers_count: number;
  is_following?: boolean;
  is_follower?: boolean;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface socialLoginRequestDto {
  url: string;
  code: string;
}

export interface LoginResponseDto {
  access: string;
  refresh: string;
  user: {
    pk: string;
    handle: string;
    email: string;
  };
}
