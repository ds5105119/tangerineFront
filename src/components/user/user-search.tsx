import UserProfile from './user-profile';
import { userSearchType } from './types';

const UserSearch = ({ user }: userSearchType) => {
  return (
    <div className="w-full h-12 flex items-center align-middle bg-white space-x-3">
      <div className="w-12 h-12">
        <UserProfile user={user} />
      </div>
      <div className="h-12 flex flex-col justify-center">
        <div className="text-black text-base font-bold">{user.handle}</div>
        <div className="text-gray-400 text-sm font-medium">{user.username}</div>
      </div>
    </div>
  );
};

export default UserSearch;
