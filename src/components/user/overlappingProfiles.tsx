import React from 'react';
import Profile from './profile';
import { User } from '@/types/api/accounts';

interface OverlappingProfilesProps {
  user1: User;
  user2: User;
  size?: number;
}

export default function OverlappingProfiles({ user1, user2 }: OverlappingProfilesProps) {
  return (
    <div className="relative inline-flex w-[3.2rem] h-[3.2rem] select-none">
      <Profile user={user1} className="absolute top-0 left-0 w-12 h-12 dark:w-11 dark:h-11" />
      <Profile
        user={user2}
        className="absolute bottom-0 right-0 w-11 h-11 outline outline-white dark:outline-black outline-2"
      ></Profile>
    </div>
  );
}
