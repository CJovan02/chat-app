import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Chat } from '@/domain/models/chat';
import { cn } from '@/lib/utils';
import { getLastMessageFromChat } from '@/hooks/useRoomsLogic';
import { formatMessageTime } from '@/utils/utils';

type Props = {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
};

function DashboardChat({ chat, isActive, onClick }: Props) {
  const lastMessage = getLastMessageFromChat(chat);

  return (
    <Button
      onClick={onClick}
      variant='ghost'
      className={cn(
        `h-auto w-full justify-start gap-3 px-3 py-2 hover:bg-surface-interactive-hover ${isActive ? 'bg-surface-interactive-active' : ''}`,
      )}>
      {/* Avatar */}
      <Avatar className='size-10 bg'>
        <AvatarFallback className='bg-primary/10 text-foreground text-md'>
          {chat.name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Chat meta */}
      <div className='min-w-0 flex-1 text-left'>
        <div className='flex items-center justify-between'>
          <span className='truncate text-sm font-semibold'>{chat.name}</span>
          <span className='text-xs text-muted-foreground'>
            {lastMessage === undefined
              ? ''
              : formatMessageTime(lastMessage.sentAt)}
          </span>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <span className='truncate text-xs text-muted-foreground'>
            {lastMessage !== undefined
              ? lastMessage.text
              : `Start chatting with ${chat.name}`}
          </span>

          {/*{chat.unread > 0 && (*/}
          {/*  <span className='rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground'>*/}
          {/*    {chat.unread}*/}
          {/*  </span>*/}
          {/*)}*/}
        </div>
      </div>
    </Button>
  );
}

export default DashboardChat;
