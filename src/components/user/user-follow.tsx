import Button from '../button/roundButton';
import UserProfile from './user-profile';
import { userFollowType } from './types';

const UserFollow = ({ user, onFollowButtonClick }: userFollowType) => {
  if (user?.is_following === undefined) {
    return (
      <div className="select-none w-full px-5 py-2 flex rounded-lg justify-between items-center align-middle hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700">
        <div className="flex items-center align-middle space-x-3">
          <div className="w-11 h-11">
            <UserProfile user={user} />
          </div>
          <div className="h-12 flex flex-col justify-center">
            <div className="text-base font-bold">{user.handle}</div>
            <div className="text-gray-400 dark:text-gray-300 text-sm font-medium">{user.username}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="select-none w-full px-5 py-2 flex rounded-lg justify-between items-center align-middle hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700">
        <div className="flex items-center align-middle space-x-3">
          <div className="w-11 h-11">
            <UserProfile user={user} />
          </div>
          <div className="h-12 flex flex-col justify-center">
            <div className="text-base font-bold">{user.handle}</div>
            <div className="text-gray-400 dark:text-gray-300 text-sm font-medium">{user.username}</div>
          </div>
        </div>
        <div className="flex justify-center min-w-20">
          {user.is_following ? (
            <Button intent={'active'} size={'s'} onClick={() => onFollowButtonClick(user)}>
              팔로우 취소
            </Button>
          ) : (
            <Button size={'s'} onClick={() => onFollowButtonClick(user)}>
              팔로우
            </Button>
          )}
        </div>
      </div>
    );
  }
};

export default UserFollow;
