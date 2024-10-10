'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatRoomType } from '@/types/api/chat';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from '@/lib/authToken';
import { useTimeAgo } from '@/hooks/time';
import Profile from '../user/profile';
import OverlappingProfiles from '../user/overlappingProfiles';

interface ChatRoomProps {
  chatRoom: ChatRoomType;
}

const ChatRoom = ({ chatRoom }: ChatRoomProps) => {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthType>();

  const members = () => {
    return chatRoom.members.filter((member) => member.user.handle !== auth?.user.handle);
  };

  const handleChatRoomClick = () => {
    router.push(`/message/${chatRoom.uuid}`);
  };

  function truncateString(str: string) {
    if (str.length > 20) {
      return str.slice(0, 20) + '...';
    } else {
      return str;
    }
  }

  useEffect(() => {
    const authData = getAuth();
    if (authData) {
      setAuth(authData);
    }
  }, []);

  return (
    <div
      className="flex w-full h-20 px-5 items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
      onClick={handleChatRoomClick}
    >
      {members().length == 1 ? (
        <Profile user={members()[0].user} className="w-12 h-12" />
      ) : (
        <OverlappingProfiles user1={members()[0].user} user2={members()[1].user} />
      )}
      <div className="flex flex-col space-y-1">
        {chatRoom.name ? (
          <h2 className="text-base font-semibold text-overflow select-none">{chatRoom.name}</h2>
        ) : (
          <h2 className="text-base font-semibold text-overflow select-none">
            {members()
              .map((member) => member.user.username)
              .join(', ')}
          </h2>
        )}
        <div className="flex space-x-1 items-center">
          <div className="text-sm font-semibold text-overflow">{truncateString(chatRoom.first_message)}</div>
          <div className="text-sm text-gray-500 select-none">- {useTimeAgo(chatRoom.updated_at)}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
