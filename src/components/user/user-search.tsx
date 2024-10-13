import UserProfile from './user-profile';
import { userSearchType } from './types';

const UserSearch = ({ user, onClick }: userSearchType) => {
  return (
    <div
      className="select-none w-full px-5 py-2 flex rounded-lg justify-between items-center align-middle hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700"
      onClick={() => onClick(user)}
    >
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
};

export default UserSearch;
