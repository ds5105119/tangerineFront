import React from 'react';

interface ChatRoomSkeletonProps {
  itemCount?: number;
}

export const ChatRoomSkeleton = ({ itemCount = 4 }: ChatRoomSkeletonProps) => {
  return (
    <div className="bg-gray-900 p-4 space-y-4">
      {[...Array(itemCount)].map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-12 animate-pulse" />
            </div>
            <div className="h-3 bg-gray-700 rounded w-16 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatRoomSkeleton;
