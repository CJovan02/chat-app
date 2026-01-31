import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  LogOut,
  MessageCircle,
  Search,
  Send,
  Settings,
  User,
} from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

const chats = [
  {
    id: 'design-squad',
    name: 'Design Squad',
    lastMessage: 'Can you review the dashboard layout?',
    time: '2m',
    unread: 2,
  },
  {
    id: 'product-sync',
    name: 'Product Sync',
    lastMessage: 'Sprint goals are ready for review.',
    time: '18m',
    unread: 0,
  },
  {
    id: 'frontend',
    name: 'Frontend Guild',
    lastMessage: 'New component library drops today.',
    time: '1h',
    unread: 3,
  },
  {
    id: 'support',
    name: 'Customer Support',
    lastMessage: 'Ticket #4821 escalated.',
    time: '3h',
    unread: 0,
  },
];

const messages = [
  {
    id: 'm1',
    author: 'Sam',
    content: 'Hey! Can you share the latest dashboard layout?',
    time: '09:41',
    isMe: false,
  },
  {
    id: 'm2',
    author: 'You',
    content: 'Sure, I will send it over in a couple of minutes.',
    time: '09:42',
    isMe: true,
  },
  {
    id: 'm3',
    author: 'Sam',
    content: 'Great, I will prepare the handoff notes.',
    time: '09:44',
    isMe: false,
  },
  {
    id: 'm4',
    author: 'You',
    content: 'Perfect. I added a profile popover menu too.',
    time: '09:45',
    isMe: true,
  },
];

const Dashboard = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id ?? '');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navigateToLogin = () => navigate('/login');

  useEffect(() => {
    if (user === null) {
      navigateToLogin();
    }
  }, [user]);

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? chats[0],
    [activeChatId],
  );

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) {
        return;
      }
      if (menuButtonRef.current?.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  if (user === null) {
    return null;
  }

  return (
    <div className='flex h-screen w-screen bg-slate-950 text-slate-100'>
      <aside className='flex w-72 flex-col border-r border-slate-800 bg-slate-900/60'>
        <div className='px-4 pt-5'>
          <div className='flex items-center gap-2 text-sm font-semibold text-slate-200'>
            <MessageCircle className='size-4 text-indigo-400' />
            Recent Chats
          </div>
          <div className='mt-4 flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm'>
            <Search className='size-4 text-slate-400' />
            <input
              type='text'
              placeholder='Search chats'
              className='w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500'
            />
          </div>
        </div>

        <div className='mt-4 flex-1 space-y-2 overflow-y-auto px-3 pb-6'>
          {chats.map((chat) => (
            <button
              key={chat.id}
              type='button'
              onClick={() => setActiveChatId(chat.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition',
                chat.id === activeChatId
                  ? 'bg-slate-800/80 text-slate-100'
                  : 'text-slate-300 hover:bg-slate-800/40',
              )}>
              <div className='flex size-10 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-200'>
                {chat.name
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')}
              </div>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center justify-between'>
                  <span className='truncate text-sm font-semibold'>
                    {chat.name}
                  </span>
                  <span className='text-xs text-slate-500'>{chat.time}</span>
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <span className='truncate text-xs text-slate-400'>
                    {chat.lastMessage}
                  </span>
                  {chat.unread > 0 && (
                    <span className='rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-semibold text-white'>
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className='relative border-t border-slate-800 px-4 py-4'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white'>
                AP
              </div>
              <div>
                <div className='text-sm font-semibold'>{user.displayName}</div>
                <div className='text-xs text-slate-400'>@{user.username}</div>
              </div>
            </div>
            <Button
              ref={menuButtonRef}
              variant='ghost'
              size='icon-sm'
              onClick={() => setMenuOpen((open) => !open)}
              aria-haspopup='menu'
              aria-expanded={menuOpen}
              className='text-slate-300 hover:text-slate-100'>
              <ChevronDown className='size-4' />
            </Button>
          </div>
          {menuOpen && (
            <div
              ref={menuRef}
              role='menu'
              className='absolute bottom-16 left-4 w-52 rounded-lg border border-slate-800 bg-slate-900 p-2 shadow-xl'>
              <button
                type='button'
                role='menuitem'
                onClick={() => setMenuOpen(false)}
                className='flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-slate-800'>
                <User className='size-4 text-slate-400' />
                View profile
              </button>
              <button
                type='button'
                role='menuitem'
                onClick={() => setMenuOpen(false)}
                className='flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-slate-800'>
                <Settings className='size-4 text-slate-400' />
                Settings
              </button>
              <button
                type='button'
                role='menuitem'
                onClick={() => setMenuOpen(false)}
                className='flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-300 hover:bg-slate-800'>
                <LogOut className='size-4 text-red-300' />
                Sign out
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className='flex flex-1 flex-col'>
        <header className='flex items-center justify-between border-b border-slate-800 px-6 py-4'>
          <div>
            <div className='text-lg font-semibold'>
              {activeChat?.name ?? 'Chat'}
            </div>
            <div className='text-xs text-slate-400'>
              Active now · 12 members online
            </div>
          </div>
          <div className='flex items-center gap-2 text-xs text-slate-400'>
            <span className='inline-flex size-2 rounded-full bg-emerald-400' />
            Live
          </div>
        </header>

        <div className='flex-1 overflow-y-auto px-6 py-6'>
          <div className='space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-end gap-3',
                  message.isMe ? 'justify-end' : 'justify-start',
                )}>
                {!message.isMe && (
                  <div className='flex size-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200'>
                    {message.author[0]}
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    message.isMe
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-100',
                  )}>
                  <div className='text-xs font-semibold uppercase tracking-wide text-white/70'>
                    {message.isMe ? 'You' : message.author}
                  </div>
                  <div className='mt-1'>{message.content}</div>
                  <div className='mt-2 text-[10px] text-white/70'>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='border-t border-slate-800 px-6 py-4'>
          <div className='flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2'>
            <Input
              placeholder='Type a message...'
              className='border-0 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus-visible:ring-0'
            />
            <Button
              type='button'
              size='icon-sm'
              className='bg-indigo-500 text-white hover:bg-indigo-400'>
              <Send className='size-4' />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
