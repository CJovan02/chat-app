import { Chat } from '@/domain/models/chat';

type Props = {
  activeChat: Chat;
};

function ChatHeader({ activeChat }: Props) {
  return (
    <header className='flex items-center justify-between border-b border-primary/20 px-6 py-4'>
      <div>
        <div className='text-2xl font-semibold'>
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
