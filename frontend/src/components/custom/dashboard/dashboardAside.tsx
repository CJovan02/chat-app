import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, MessageCirclePlus, Search } from 'lucide-react';
import ProfileDropDownContent from '@/components/custom/dashboard/sidebar/profileDropDownContent';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import { useRoomsLogic } from '@/hooks/useRoomsLogic';
import { showError } from '@/toast';
import { Spinner } from '@/components/ui/spinner';
import DashboardChat from '@/components/custom/dashboard/sidebar/dashboardChat';
import { Separator } from '@/components/ui/separator';
import CreateRoomDialog from '@/components/custom/createRoom/createRoomDialog';

function DashboardAside() {
  const { user } = useUserStore();
  const [addRoomOpen, setAddRoomOpen] = useState(false);
  const {
    chats,
    isError,
    isLoading,
    isLoaded,
    refetch,
    errorMessage,
    setActiveChat,
    isChatActive,
  } = useRoomsLogic();

  useEffect(() => {
    if (isError) {
      showError(errorMessage);
    }
  }, [isError, errorMessage]);

  return (
    <>
      <CreateRoomDialog
        open={addRoomOpen}
        onOpenChange={setAddRoomOpen}
        close={() => setAddRoomOpen(false)}
      />

      <aside className='flex h-full w-78 flex-col border-r border-primary/20 bg-background-tinted-secondary'>
        {/* Header + Search */}
        <div className='px-4 pt-5 mb-5'>
          <div className='flex items-center gap-3 text-xl font-semibold'>
            <MessageCircle className='size-5 text-primary/40' />
            Recent Chats
            <Button
              variant='default'
              size='icon'
              className='ml-auto size-10'
              onClick={() => setAddRoomOpen(true)}>
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

        {isError && (
          <div className='flex items-center flex-col justify-center h-full px-4'>
            <p>Error trying to load chats, please try again.</p>
            <Button
              className='my-7 w-full font-bold text-md h-10'
              variant='default'
              onClick={() => refetch()}>
              Try Again
            </Button>
          </div>
        )}

        {isLoading && (
          <div className='flex flex-1 items-center justify-center h-full'>
            <Spinner className='size-10 text-primary' />
          </div>
        )}

        {isLoaded && (
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

            <ProfileDropDownContent />
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardAside;
