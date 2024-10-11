import React from 'react';

interface ChatMessageProps {
  isOwn: boolean;
  isConsecutive: boolean;
  children: React.ReactNode;
  time: string;
}

const ChatMessage = ({ isOwn, isConsecutive, children }: ChatMessageProps) => {
  return (
    <div
      className={`max-w-[60dvw] break-words px-4 py-2 rounded-3xl mb-2 text-wrap font-medium ${
        isOwn ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-50'
      } ${
        isOwn ? (isConsecutive ? 'rounded-r-xl' : 'rounded-r-3xl') : isConsecutive ? 'rounded-l-xl' : 'rounded-l-3xl'
      }`}
    >
      {children}
    </div>
  );
};

export default ChatMessage;
