import Image from 'next/image';
import { userProfileType } from './types';

const UserProfile = ({ user }: userProfileType) => {
  const profileURL = user.profile.profile_image || '/defaultUserIcon.png';

  return (
    <Image
      src={profileURL}
      alt={`${user.username}'s profile`}
      width={40}
      height={40}
      className="object-cover w-full h-full"
    />
  );
};

export default UserProfile;
