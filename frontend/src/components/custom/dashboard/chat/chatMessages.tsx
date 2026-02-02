import { cn } from '@/lib/utils';
import useChatLogic from '@/hooks/useChatLogic';
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';
import { showError } from '@/toast';

function ChatMessages() {
  const {
    messages,
    isMe,
    activeChat,
    isLoading,
    isLoaded,
    isError,
    errorMessage,
  } = useChatLogic();

  if (!activeChat) {
    return null;
  }

  useEffect(() => {
    if (isError) showError(errorMessage);
  }, [isError, errorMessage]);

  return (
    <div className='flex-1 overflow-y-auto px-6 py-6'>
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

      {(isLoaded && messages.length > 0) && (
        <div className='space-y-4'>
          {messages.map((message) => {
            const localTime = new Date(message.sentAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });
            const me = isMe(message.senderId);
            return (
              <div
                key={message.id}
                className={cn(
                  'flex items-end gap-3',
                  me ? 'justify-end' : 'justify-start',
                )}>
                {!me && (
                  <div className='flex size-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200'>
                    {activeChat.otherUserDisplayName[0]}
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    me
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-100',
                  )}>
                  <div className='text-xs font-semibold tracking-wide text-white/70'>
                    {me ? 'You' : activeChat.otherUserDisplayName}
                  </div>
                  <div className='mt-1'>{message.text}</div>
                  <div className='mt-2 text-[10px] text-white/70'>
                    {localTime}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ChatMessages;
