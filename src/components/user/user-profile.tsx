import Image from 'next/image';
import { userProfileType } from './types';

const UserProfile = ({ user }: userProfileType) => {
  const profileURL = user.profile.profile_image || '/defaultUserIcon.png';

  return (
    <Image
      src={profileURL}
      alt={`${user.username}'s profile`}
      width={50}
      height={50}
      className="object-cover w-full h-full"
    />
  );
};

export default UserProfile;
