'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@/types/api/accounts';

interface UserProfileProps {
  user?: User;
  priority?: boolean;
  className: string;
}

const Profile = ({ user, priority, className }: UserProfileProps) => {
  const profileURL = user?.profile.profile_image || '/defaultUserIcon.png';
  const handle = user?.handle || 'unknown';

  return (
    <div className={`rounded-full overflow-hidden pointer-events-none ${className}`}>
      <Image
        src={profileURL}
        alt={`${handle}'s profile`}
        width={50}
        height={50}
        className="relative object-cover w-full h-full select-none"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = profileURL;
        }}
        priority={priority}
      />
    </div>
  );
};

export default Profile;
