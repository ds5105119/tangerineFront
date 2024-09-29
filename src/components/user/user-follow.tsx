import Button from '../button/roundButton';
import UserProfile from './user-profile';
import { userFollowType } from './types';

const UserFollow = ({ user, onFollowButtonClick }: userFollowType) => {
  if (user?.is_following === undefined) {
    return (
      <div className="w-full h-12 flex justify-between items-center align-middle bg-white">
        <div className="flex items-center align-middle space-x-3">
          <div className="w-12 h-12">
            <UserProfile user={user} />
          </div>
          <div className="h-12 flex flex-col justify-center">
            <div className="text-black text-base font-bold">{user.handle}</div>
            <div className="text-gray-400 text-sm font-medium">{user.username}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-12 flex justify-between items-center align-middle bg-white">
        <div className="flex items-center align-middle space-x-3">
          <div className="w-12 h-12">
            <UserProfile user={user} />
          </div>
          <div className="h-12 flex flex-col justify-center">
            <div className="text-black text-base font-bold">{user.handle}</div>
            <div className="text-gray-400 text-sm font-medium">{user.username}</div>
          </div>
        </div>
        <div className="flex justify-center min-w-20">
          {user.is_following ? (
            <Button size={'s'}>팔로우</Button>
          ) : (
            <Button intent={'active'} size={'s'}>
              팔로우 취소
            </Button>
          )}
        </div>
      </div>
    );
  }
};

export default UserFollow;
