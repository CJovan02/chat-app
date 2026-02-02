import { useCallback, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import DashboardAside from '@/components/custom/dashboard/dashboardAside';
import DashboardAsideSheet from '@/components/custom/dashboard/dashboardAsideSheet';
import { useGetMessage } from '@/api/generated/message/message';
import { showError } from '@/toast';
import { Spinner } from '@/components/ui/spinner';
import { useRoomsLogic } from '@/hooks/useRoomsLogic';
import useChatLogic from '@/hooks/useChatLogic';
import ChatHeader from '@/components/custom/dashboard/chat/chatHeader';
import { useChatStore } from '@/store/chatStore';
import ChatMessages from '@/components/custom/dashboard/chat/chatMessages';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const activeChat = useChatStore((state) =>
    state.activeChatId ? state.chats[state.activeChatId] : null,
  );

  const navigateToLogin = () => navigate('/login');
  useEffect(() => {
    if (user === null) {
      navigateToLogin();
    }
  }, [user]);

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
        {!activeChat && (
          <div className='text-2xl font-bold m-auto'>
            Select chat on the left side to display it's messages.
          </div>
        )}

        {activeChat && (
          <>
            <ChatHeader activeChat={activeChat} />

            <ChatMessages />

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
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
