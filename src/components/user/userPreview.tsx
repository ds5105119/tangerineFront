'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types/api/accounts';
import { createFollow, deleteFollow } from '@/hooks/accounts/follow';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/lib/auth';
import Button from '../button/button';
import Profile from './profile';

interface UserPreviewProps {
  handle: string | undefined;
}
const UserPreview = ({ handle }: UserPreviewProps) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User>();
  const { auth } = useAuthStore();

  const onFollowButtonClick = async () => {
    if (user) {
      if (user.is_following) {
        await deleteFollow(user);
      } else {
        await createFollow(user);
      }
      await queryClient.refetchQueries({ queryKey: ['user', user.handle] });
      const newUser = queryClient.getQueryData(['user', handle]) as User;
      setUser(newUser);
    }
  };

  useEffect(() => {
    const newUser = queryClient.getQueryData(['user', handle]) as User;
    setUser(newUser);
  }, [user, handle]);

  return (
    <div className="flex w-full flex-col space-y-5">
      <div className="flex w-full justify-between">
        <div className="flex space-x-8">
          {/* 프로필 */}
          <Profile user={user} className="flex-shrink-0 w-20 h-20 mt-5 lg:w-32 lg:h-32 lg:mt-0" priority={true} />

          <div className="flex flex-col space-y-5">
            {/* handle, username */}
            <div className="flex flex-col space-y-1 mt-3">
              <div className="text-xl lg:text-2xl font-bold">{user?.handle}</div>
              <div>{user?.username}</div>
            </div>

            {/* 팔로잉 정보 */}
            <div className="flex space-x-8">
              <div className="flex space-x-1 items-center">
                <div>팔로워</div>
                <div className="text-lg font-extrabold">{user?.followers_count}</div>
              </div>
              <div className="flex space-x-1 items-center">
                <div>팔로잉</div>
                <div className="text-lg font-extrabold">{user?.follows_count}</div>
              </div>
            </div>
            <div className="text-sm text-wrap">{user?.profile.bio}</div>
          </div>
        </div>
        <div className="mt-5 min-w-24">
          {auth?.user.handle === handle ? (
            <Button
              size={'sm'}
              intent={'outline'}
              onClick={() => {
                window.location.href = '/accounts/edit';
              }}
            >
              프로필 변경
            </Button>
          ) : (
            <Button size={'sm'} intent={'outline'} onClick={onFollowButtonClick}>
              {user?.is_following ? '팔로우 취소' : '팔로우'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPreview;
