import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import { useRoomsLogic } from '@/hooks/useRoomsLogic';
import { showError } from '@/toast';
import CreateRoomDialog from '@/components/custom/createRoom/createRoomDialog';
import {
  ChevronsUpDown,
  MessageCircle,
  MessageCirclePlus,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import DashboardChat from '@/components/custom/dashboard/dashboardChat';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ProfileDropDownContent from '@/components/custom/dashboard/profileDropDownContent';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DashboardSidebar() {
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

      <Sidebar side='left'>
        <SidebarHeader className='px-4'>
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
        </SidebarHeader>
        <SidebarContent>
          {isError && (
            <SidebarGroup className='flex items-center flex-col justify-center'>
              <p>Error trying to load chats, please try again.</p>
              <Button
                className='my-7 w-full font-bold text-md h-10'
                variant='default'
                onClick={() => refetch()}>
                Try Again
              </Button>
            </SidebarGroup>
          )}

          {isLoading && (
            <SidebarGroup className='flex-1 items-center justify-center h-full'>
              <Spinner className='size-10 text-primary' />
            </SidebarGroup>
          )}

          {isLoaded && (
            <SidebarGroup className='mt-5 flex-1 space-y-2'>
              {Object.values(chats).map((chat) => (
                <DashboardChat
                  key={chat.id}
                  chat={chat}
                  isActive={isChatActive(chat.id)}
                  onClick={() => setActiveChat(chat.id)}
                />
              ))}
            </SidebarGroup>
          )}
        </SidebarContent>

        <SidebarFooter className='border-t border-primary/20 px-4 py-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='flex justify-between'>
                <div className='flex gap-2'>
                  <Avatar className='size-10'>
                    <AvatarFallback className='bg-primary text-primary-foreground'>
                      {user.displayName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <span className='text-sm font-semibold'>
                      {user.displayName}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                      @{user.username}
                    </span>
                  </div>
                </div>

                <ChevronsUpDown />
              </Button>
            </DropdownMenuTrigger>

            <ProfileDropDownContent />
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
