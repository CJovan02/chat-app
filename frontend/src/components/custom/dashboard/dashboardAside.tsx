import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Search } from 'lucide-react';
import ProfileDropDown from '@/components/custom/dashboard/profileDropDown';
import { useUserStore } from '@/store/userStore';
import { useMemo, useState } from 'react';

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

function DashboardAside() {
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id ?? '');
  const { user } = useUserStore();

  return (
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
              {user.displayName[0].toUpperCase()}
            </div>
            <div>
              <div className='text-sm font-semibold'>{user.displayName}</div>
              <div className='text-xs text-slate-400'>@{user.username}</div>
            </div>
          </div>
          <ProfileDropDown />
        </div>
      </div>
    </aside>
    // <aside className='flex w-88 flex-col border-r'>
    //   {/* Header + Search */}
    //   <div className='px-4 pt-5'>
    //     <div className='flex items-center gap-2 text-sm font-semibold'>
    //       <MessageCircle className='size-4' />
    //       Recent Chats
    //     </div>
    //
    //     <div className='mt-4 flex items-center gap-2'>
    //       <Search className='size-4 text-muted-foreground' />
    //       <Input
    //         placeholder='Search chats'
    //         className='h-9'
    //       />
    //     </div>
    //   </div>
    //
    //   {/* Chats list */}
    //   <ScrollArea className='mt-4 flex-1 px-3 pb-6'>
    //     <div className='space-y-2'>
    //       {chats.map((chat) => (
    //         <Button
    //           key={chat.id}
    //           variant={chat.id === activeChatId ? 'secondary' : 'ghost'}
    //           className={cn('h-auto w-full justify-start gap-3 px-3 py-2')}
    //           onClick={() => setActiveChatId(chat.id)}>
    //           {/* Avatar */}
    //           <Avatar className='size-10'>
    //             <AvatarFallback>
    //               {chat.name
    //                 .split(' ')
    //                 .slice(0, 2)
    //                 .map((part) => part[0])
    //                 .join('')}
    //             </AvatarFallback>
    //           </Avatar>
    //
    //           {/* Chat meta */}
    //           <div className='min-w-0 flex-1 text-left'>
    //             <div className='flex items-center justify-between'>
    //               <span className='truncate text-sm font-semibold'>
    //                 {chat.name}
    //               </span>
    //               <span className='text-xs text-muted-foreground'>
    //                 {chat.time}
    //               </span>
    //             </div>
    //
    //             <div className='flex items-center justify-between gap-2'>
    //               <span className='truncate text-xs text-muted-foreground'>
    //                 {chat.lastMessage}
    //               </span>
    //
    //               {chat.unread > 0 && (
    //                 <span className='rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground'>
    //                   {chat.unread}
    //                 </span>
    //               )}
    //             </div>
    //           </div>
    //         </Button>
    //       ))}
    //     </div>
    //   </ScrollArea>
    //
    //   {/* User footer */}
    //   <div className='border-t px-4 py-4'>
    //     <div className='flex items-center justify-between gap-3'>
    //       <div className='flex items-center gap-3'>
    //         <Avatar className='size-10'>
    //           <AvatarFallback>
    //             {user.displayName[0].toUpperCase()}
    //           </AvatarFallback>
    //         </Avatar>
    //
    //         <div>
    //           <div className='text-sm font-semibold'>{user.displayName}</div>
    //           <div className='text-xs text-muted-foreground'>
    //             @{user.username}
    //           </div>
    //         </div>
    //       </div>
    //
    //       <ProfileDropDown />
    //     </div>
    //   </div>
    // </aside>
  );
}

export default DashboardAside;
