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
import chatHub from '@/signalr/chatHub';
import ChatSection from '@/components/custom/dashboard/chat/chatSection';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const activeChat = useChatStore((state) =>
    state.activeChatId ? state.chats[state.activeChatId] : null,
  );

  useEffect(() => {
    async function connect() {
      await chatHub.getInstance().start();
    }

    connect();
  }, []);

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

      <main className='flex flex-1 flex-col bg-background-tinted'>
        {!activeChat && (
          <div className='text-2xl font-bold m-auto px-15'>
            Select chat on the left side to display it's messages.
          </div>
        )}

        {activeChat && <ChatSection />}
      </main>
    </div>
  );
};

export default Dashboard;
