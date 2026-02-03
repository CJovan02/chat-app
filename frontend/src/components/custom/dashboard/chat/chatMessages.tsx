import { UseChatLogicReturn } from '@/hooks/useChatLogic';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useRef } from 'react';
import { showError } from '@/toast';
import MessageBubble from '@/components/custom/dashboard/chat/messageBubble';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  logic: UseChatLogicReturn;
};

function ChatMessages({ logic }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const {
    messages,
    isMe,
    activeChat,
    isLoading,
    isLoaded,
    isError,
    errorMessage,
  } = logic;

  if (!activeChat) {
    return null;
  }

  useEffect(() => {
    if (isError) showError(errorMessage);
  }, [isError, errorMessage]);

  useEffect(() => {
    if (messages.length === 0) return;

    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea className='flex-1 overflow-y-auto px-6 py-6 h-full'>
      {isLoading && (
        <div className='flex items-center justify-center h-full'>
          <Spinner className='size-10 text-primary' />
        </div>
      )}

      {isLoaded && messages.length === 0 && (
        <div className='mt-5 text-center font-bold text-xl'>
          Start by sending a message to your new friend.
        </div>
      )}

      {isLoaded && messages.length > 0 && (
        <div className='space-y-4'>
          {messages.map((message) => {
            const me = isMe(message.senderId);
            return (
              <MessageBubble
                message={message}
                activeChat={activeChat}
                isMe={me}
              />
            );
          })}
        </div>
      )}

      <div ref={bottomRef} />
    </ScrollArea>
  );
}

export default ChatMessages;
