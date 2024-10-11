import { InputHTMLAttributes, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChatMessageType } from '@/types/api/chat';
import Button from '@/components/button/button';

interface ChatInputProps extends InputHTMLAttributes<HTMLInputElement> {
  sendMessage: (message: ChatMessageType) => void;
  memberid: number;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage, memberid, ...props }) => {
  const { uuid } = useParams();
  const [message, setMessage] = useState<string>('');

  const handleChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const isoString = now.toISOString();
    sendMessage({ room_id: uuid as string, member: memberid, text: message, created_at: isoString });
    setMessage('');
  };

  return (
    <form className="flex w-full px-6 my-3 space-x-3" onSubmit={handleChatMessage}>
      <input
        className={`appearance-none w-full px-5 py-2 rounded-full shadow-sm bg-gray-100 dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus-visible:ring-0`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="chatInput"
        {...props}
      />
      <div className="w-20 min-w-12">
        <Button type="submit" intent={message ? 'outline' : 'disabled'} size={'sm'} disabled={!message} id="submit">
          전송
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
