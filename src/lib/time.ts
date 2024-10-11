import { useState, useEffect } from 'react';

export const useTimeAgo = (dateString: string): string => {
  const [timeAgo, setTimeAgo] = useState<string>('');
  const updatedDate = new Date(dateString);
  updatedDate.setMilliseconds(0);

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();

      const diffMilliseconds = now.getTime() - updatedDate.getTime();
      const diffSeconds = Math.floor(diffMilliseconds / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);
      const diffWeeks = Math.floor(diffDays / 7);

      if (diffSeconds < 60) {
        setTimeAgo('지금');
      } else if (diffMinutes < 60) {
        setTimeAgo(`${diffMinutes}분 전`);
      } else if (diffHours < 24) {
        setTimeAgo(`${diffHours}시간 전`);
      } else if (diffDays < 7) {
        setTimeAgo(`${diffDays}일 전`);
      } else {
        setTimeAgo(`${diffWeeks}주 전`);
      }
    };

    calculateTimeAgo();

    const getUpdateInterval = () => {
      const updatedDate = new Date(dateString);
      const now = new Date();
      const diffSeconds = Math.floor((now.getTime() - updatedDate.getTime()) / 1000);

      if (diffSeconds < 60) return 1000;
      if (diffSeconds < 3600) return 1000 * 60;
      if (diffSeconds < 86400) return 1000 * 60 * 60;
      return 1000 * 60 * 60 * 24;
    };

    const interval = setInterval(() => {
      calculateTimeAgo();
    }, getUpdateInterval());

    return () => clearInterval(interval);
  }, [dateString]);

  return timeAgo;
};
