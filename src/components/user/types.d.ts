import { User } from '@/types/api/accounts';

type UserPreviewType = Pick<User, 'handle' | 'username'> & {
  profile: Pick<User['profile'], 'profile_image'>;
} & Partial<Omit<User, 'handle' | 'username' | 'profile'>>;

export interface userProfileType {
  user: UserPreviewType;
}

export interface userSearchType {
  user: UserPreviewType;
}

export interface userFollowType {
  user: UserPreviewType;
  onFollowButtonClick?: () => void;
}
