'use client';

import React, { KeyboardEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUserList } from '@/hooks/accounts/account';
import { useCreateChatRoom } from '@/hooks/chats/chat';
import { UserPreviewType } from '../user/types';
import UserSearch from '../user/user-search';

const TopRoomNav = () => {
  const queryClient = useQueryClient();
  const createChatRoom = useCreateChatRoom();
  const [inputValue, setInputValue] = useState<string>('');
  const { Users, refetch, fetchNextPage } = useUserList({ search: inputValue });

  const onSubmit = () => {
    if (inputValue) {
      refetch();
      fetchNextPage();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // 한글에서 두번 입력되는 문제 해결을 위해 native Event 속성 참조
    if (event.nativeEvent.isComposing && event.key === 'Enter') {
      onSubmit();
      setInputValue('');
    } else if (event.key === 'Enter') {
      setInputValue('');
    }
  };

  const handleProfileClick = (user: UserPreviewType) => {
    createChatRoom.mutate(
      { handles: [user.handle] },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['chatRoomList'] });
        },
      }
    );
  };

  return (
    <div className="w-full">
      <div className="w-full min-h-16 flex justify-between items-center align-middle px-6 space-x-2">
        <div className="w-full h-10 flex align-middle px-7 bg-gray-100 dark:bg-gray-700 rounded-[12rem]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
      </div>
      {!!Users ? (
        <div className="flex flex-col px-8 my-6 space-y-2">
          {Users?.map((val) => <UserSearch key={val.handle} user={val} onClick={handleProfileClick} />)}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TopRoomNav;
