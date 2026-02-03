import { Chat } from '@/domain/models/chat';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UserAvatar from '@/components/custom/userAvatar';

type Props = {
  activeChat: Chat;
};

function ChatHeader({ activeChat }: Props) {
  return (
    <header className='flex items-center justify-between border-b border-primary/20 px-3 py-4'>
      <div className='flex gap-4 items-center'>
        <SidebarTrigger className='size-10' />
        <UserAvatar
          name={activeChat.name}
          classNameAvatar='size-11'
          classNameFallback='text-xl'
        />

        <div className='text-xl font-semibold'>
          {activeChat.otherUserDisplayName}
        </div>
      </div>
      <div className='flex items-center gap-2 text-xs text-slate-400'>
        <span className='inline-flex size-2 rounded-full bg-emerald-400' />
        Live
      </div>
    </header>
  );
}

export default ChatHeader;
