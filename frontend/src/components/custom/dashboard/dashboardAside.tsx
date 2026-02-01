import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, MessageCirclePlus, Search } from 'lucide-react';
import ProfileDropDown from '@/components/custom/dashboard/profileDropDown';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import { ChatsState, useChatLogic } from '@/hooks/useChatLogic';
import { showError } from '@/toast';
import { Spinner } from '@/components/ui/spinner';
import DashboardChat from '@/components/custom/dashboard/dashboardChat';
import { Separator } from '@/components/ui/separator';
import CreateRoomDialog from '@/components/custom/createRoom/createRoomDialog';

function DashboardAside() {
  const { user } = useUserStore();
  const [addRoomOpen, setAddRoomOpen] = useState(false);
  const { chats, fetchChats, setActiveChat, isChatActive, state } =
    useChatLogic();

  useEffect(() => {
    async function loadChats() {
      await fetchChats();
    }

    loadChats();
  }, [fetchChats]);

  useEffect(() => {
    if (state == ChatsState.error) {
      showError('Error trying to load chats, please try again.');
    }
  }, [state]);

  return (
    <>
      <CreateRoomDialog
        open={addRoomOpen}
        onOpenChange={setAddRoomOpen}
        close={() => setAddRoomOpen(false)}
      />

      <aside className='flex h-full w-78 flex-col border-r border-primary/20'>
        {/* Header + Search */}
        <div className='px-4 pt-5 mb-5'>
          <div className='flex items-center gap-3 text-xl font-semibold'>
            <MessageCircle className='size-5 text-primary/40' />
            Recent Chats
            <Button
              variant='default'
              size='icon'
              className='ml-auto size-10'
              onClick={() => setAddRoomOpen(true)}
            >
              <MessageCirclePlus className='size-4' />
            </Button>
          </div>
          <div className='mt-4 flex items-center gap-2 text-sm'>
            <Search className='size-4' />
            <Input
              type='text'
              placeholder='Search chats'
              className='w-full text-sm'
            />
          </div>
        </div>

        <Separator className='bg-primary/20' />

        {state == ChatsState.error && (
          <div className='flex items-center flex-col justify-center h-full px-4'>
            <p>Error trying to load chats, please try again.</p>
            <Button
              className='my-7 w-full font-bold text-md h-10'
              variant='default'
              onClick={fetchChats}>
              Try Again
            </Button>
          </div>
        )}

        {(state == ChatsState.loading || state == ChatsState.init) && (
          <div className='flex flex-1 items-center justify-center h-full'>
            <Spinner className='size-10 text-primary' />
          </div>
        )}

        {state == ChatsState.loaded && (
          <div className='mt-5 flex-1 space-y-2 overflow-y-auto px-3 pb-6'>
            {Object.values(chats).map((chat) => (
              <DashboardChat
                key={chat.id}
                chat={chat}
                isActive={isChatActive(chat.id)}
                onClick={() => setActiveChat(chat.id)}
              />
            ))}
          </div>
        )}

        <div className='border-t border-primary/20 px-4 py-4'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-10'>
                <AvatarFallback className='bg-primary text-primary-foreground'>
                  {user.displayName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className='text-sm font-semibold'>{user.displayName}</div>
                <div className='text-xs text-muted-foreground'>
                  @{user.username}
                </div>
              </div>
            </div>

            <ProfileDropDown />
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardAside;

// <aside className='flex w-72 flex-col border-r border-slate-800 bg-slate-900/60'>
//   <div className='px-4 pt-5'>
//     <div className='flex items-center gap-2 text-sm font-semibold text-slate-200'>
//       <MessageCircle className='size-4 text-indigo-400' />
//       Recent Chats
//     </div>
//     <div className='mt-4 flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm'>
//       <Search className='size-4 text-slate-400' />
//       <input
//         type='text'
//         placeholder='Search chats'
//         className='w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500'
//       />
//     </div>
//   </div>
//
//   <div className='mt-4 flex-1 space-y-2 overflow-y-auto px-3 pb-6'>
//     {chats.map((chat) => (
//       <button
//         key={chat.id}
//         type='button'
//         onClick={() => setActiveChatId(chat.id)}
//         className={cn(
//           'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition',
//           chat.id === activeChatId
//             ? 'bg-slate-800/80 text-slate-100'
//             : 'text-slate-300 hover:bg-slate-800/40',
//         )}>
//         <div className='flex size-10 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-200'>
//           {chat.name
//             .split(' ')
//             .slice(0, 2)
//             .map((part) => part[0])
//             .join('')}
//         </div>
//         <div className='min-w-0 flex-1'>
//           <div className='flex items-center justify-between'>
//             <span className='truncate text-sm font-semibold'>{chat.name}</span>
//             <span className='text-xs text-slate-500'>{chat.time}</span>
//           </div>
//           <div className='flex items-center justify-between gap-2'>
//             <span className='truncate text-xs text-slate-400'>
//               {chat.lastMessage}
//             </span>
//             {chat.unread > 0 && (
//               <span className='rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-semibold text-white'>
//                 {chat.unread}
//               </span>
//             )}
//           </div>
//         </div>
//       </button>
//     ))}
//   </div>
//
//   <div className='relative border-t border-slate-800 px-4 py-4'>
//     <div className='flex items-center justify-between gap-3'>
//       <div className='flex items-center gap-3'>
//         <div className='flex size-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white'>
//           {user.displayName[0].toUpperCase()}
//         </div>
//         <div>
//           <div className='text-sm font-semibold'>{user.displayName}</div>
//           <div className='text-xs text-slate-400'>@{user.username}</div>
//         </div>
//       </div>
//       <ProfileDropDown />
//     </div>
//   </div>
// </aside>;
