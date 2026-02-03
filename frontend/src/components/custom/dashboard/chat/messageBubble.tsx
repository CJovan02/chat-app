import { cn } from '@/lib/utils';
import { Chat } from '@/domain/models/chat';
import { Message } from '@/domain/models/message';

type Props = {
  isMe: boolean;
  message: Message;
  activeChat: Chat;
};

function MessageBubble({ isMe, message, activeChat }: Props) {
  const localTime = new Date(message.sentAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      key={message.id}
      className={cn(
        'flex items-end gap-3',
        isMe ? 'justify-end' : 'justify-start',
      )}>
      {/*{!isMe && (*/}
      {/*  <UserAvatar name={activeChat.otherUserDisplayName} />*/}
      {/*)}*/}
      <div
        className={cn(
          'flex gap-4 items-center justify-center max-w-[70%] rounded-xl px-3 py-2 text-sm leading-relaxed',
          isMe ? 'bg-primary text-primary-foreground' : 'bg-muted',
        )}>
        <span>{message.text}</span>
        <span
          className={cn(
            'text-[10px] text-center leading-none',
            isMe ? 'text-primary-foreground' : 'text-foreground/80',
          )}>
          {localTime}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;
