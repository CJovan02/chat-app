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
import UpdateUserDialog from '@/components/custom/updateUser/updateUserDialog';
import ProfileDropDown from '@/components/custom/dashboard/profileDropDown';
import DashboardAside from '@/components/custom/dashboard/dashboardAside';
import DashboardAsideSheet from '@/components/custom/dashboard/dashboardAsideSheet';

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

  if (user === null) {
    return null;
  }
  // bg-slate-950 text-slate-100
  return (
    <div className='flex h-screen w-screen'>
      {/* Desktop sidebar */}
      <div className='hidden md:block h-full'>
        <DashboardAside />
      </div>

      {/* Mobile trigger */}
      <div className='md:hidden'>
        <DashboardAsideSheet />
      </div>

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
