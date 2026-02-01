import { useCallback, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import DashboardAside from '@/components/custom/dashboard/dashboardAside';
import DashboardAsideSheet from '@/components/custom/dashboard/dashboardAsideSheet';
import { useChatStore } from '@/store/chatStore';
import { useGetMessage } from '@/api/generated/message/message';
import { useGetRoomRoomId } from '@/api/generated/room/room';
import { useGetUserUserId } from '@/api/generated/user/user';
import { showError } from '@/toast';
import { Spinner } from '@/components/ui/spinner';

const Dashboard = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { activeChatId } = useChatStore();

  useEffect(() => {
    if (user === null) {
      navigateToLogin();
    }
  }, [user]);

  const {
    data: messagesData,
    isLoading: isChatLoading,
    isError: isChatError,
  } = useGetMessage({
    PageSize: 10,
    RoomId: activeChatId,
  });

  const {
    data: roomData,
    isFetching: isRoomLoading,
    isError: isRoomError,
  } = useGetRoomRoomId(activeChatId || '');
  const participantIds = roomData?.data.participantIds || [];
  const participantId = (participantIds as string[]).find(
    (id) => id !== user?.id,
  );

  const {
    data: participantData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserUserId(participantId);
  const participant = participantData?.data;

  useEffect(() => {
    if (isChatError) showError('Failed to load messages');
    if (isRoomError) showError('Failed to load room info');
    if (isUserError) showError('Failed to load participant info');
  }, [isChatError, isRoomError, isUserError]);

  const navigateToLogin = () => navigate('/login');

  const messages = useMemo(() => {
    if (!Array.isArray(messagesData?.data)) return [];
    return [...messagesData.data].reverse(); // newest at bottom
  }, [messagesData]);

  const isMe = useCallback((userId: string) => userId === user?.id, [user?.id]);

  const isLoading = isChatLoading || isRoomLoading || isUserLoading;

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

      {activeChatId === null ? (
        <></>
      ) : isLoading ? (
        <Spinner className='m-auto size-10 text-primary' />
      ) : (
        <main className='flex flex-1 flex-col'>
          <header className='flex items-center justify-between border-b border-slate-800 px-6 py-4'>
            <div>
              <div className='text-lg font-semibold'>
                {participant.displayName.toString() ?? 'Chat'}
              </div>
            </div>
            <div className='flex items-center gap-2 text-xs text-slate-400'>
              <span className='inline-flex size-2 rounded-full bg-emerald-400' />
              Live
            </div>
          </header>

          <div className='flex-1 overflow-y-auto px-6 py-6'>
            <div className='space-y-4'>
              {messages.map((message) => {
                const localTime = new Date(message.sentAt).toLocaleTimeString(
                  [],
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                );
                const me = isMe(message.senderId);
                return (
                  <div
                    key={message.id}
                    className={cn(
                      'flex items-end gap-3',
                      me ? 'justify-end' : 'justify-start',
                    )}>
                    {!me && (
                      <div className='flex size-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200'>
                        {participant?.username.toString()}
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                        me
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-100',
                      )}>
                      <div className='text-xs font-semibold uppercase tracking-wide text-white/70'>
                        {me ? 'You' : participant?.username.toString()}
                      </div>
                      <div className='mt-1'>{message.text}</div>
                      <div className='mt-2 text-[10px] text-white/70'>
                        {localTime}
                      </div>
                    </div>
                  </div>
                );
              })}
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
      )}
    </div>
  );
};

export default Dashboard;
