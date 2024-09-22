'use client';

import React, { KeyboardEvent, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { topSearchNavProps } from './types';

const TopSearchNav = ({ onBackButtonClick, onSubmit }: topSearchNavProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // 한글에서 두번 입력되는 문제 해결을 위해 native Event 속성 참조
    if (event.nativeEvent.isComposing && event.key === 'Enter' && onSubmit) {
      onSubmit(inputValue);
      setInputValue('');
    } else if (event.key === 'Enter') {
      setInputValue('');
    }
  };

  return (
    <div className="w-full h-12 flex justify-between items-center align-middle bg-white px-4">
      <button onClick={onBackButtonClick}>
        <IoArrowBack size="27" className="text-black" />
      </button>
      <div className="w-full h-9 flex align-middle ml-12 px-6 bg-gray-200 rounded-[12rem]">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="@계정 검색"
          className="w-full bg-transparent text-black focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TopSearchNav;
