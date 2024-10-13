'use client';

import { useRouter, useParams } from 'next/navigation';
import { useTimeAgo } from '@/lib/time';
import Profile from '../user/profile';
import OverlappingProfiles from '../user/overlappingProfiles';
import { ChatRoomProps } from './types';

const ChatRoom = ({ chatRoom, resize, auth }: ChatRoomProps) => {
  const router = useRouter();
  const { uuid } = useParams();

  const members = () => {
    return chatRoom.members.filter((member) => member.user.handle !== auth?.user.handle);
  };

  const handleChatRoomClick = () => {
    router.push(`/message/${chatRoom.uuid}`);
  };

  return (
    <div
      className={`w-full h-20 px-5 items-center space-x-3 cursor-pointer transition-all duration-75 ease-in-out
        ${resize ? 'hidden sm:flex' : 'flex'}
        ${chatRoom.uuid == uuid ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
      onClick={handleChatRoomClick}
    >
      {members().length == 1 ? (
        <Profile user={members()[0].user} className="flex-shrink-0  w-12 h-12" />
      ) : (
        <OverlappingProfiles user1={members()[0].user} user2={members()[1].user} />
      )}
      <div
        className={
          resize
            ? 'hidden lg:w-full lg:max-w-full lg:flex lg:flex-col lg:space-y-1'
            : 'w-full max-w-full flex flex-col space-y-1'
        }
      >
        {chatRoom.name ? (
          <h2 className="text-base font-semibold select-none">{chatRoom.name}</h2>
        ) : (
          <h2 className="text-base font-semibold text-overflow select-none">
            {members()
              .map((member) => member.user.username)
              .join(', ')}
          </h2>
        )}
        <div className="flex space-x-1 items-center">
          <div className="text-sm font-semibold truncate max-w-[60%]">{chatRoom.first_message}</div>
          <div className="text-sm text-gray-500 select-none">- {useTimeAgo(chatRoom.updated_at)}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
