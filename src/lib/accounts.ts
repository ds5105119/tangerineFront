import { AuthUser, User } from '@/types/api/accounts';

export const authUserToUser = (authUser: AuthUser | undefined): User => {
  return {
    handle: authUser?.handle ?? '',
    profile: {
      bio: authUser?.profile.bio ?? '',
      link_1: authUser?.profile.link_1 ?? '',
      link_2: authUser?.profile.link_2 ?? '',
      profile_image: authUser?.profile.profile_image ?? '',
    },
    created_at: '',
    updated_at: '',
    is_public: true,
    follows_count: 0,
    followers_count: 0,
    username: '',
  };
};
