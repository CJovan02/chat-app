import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/chatStore';
import chatHub from '@/signalr/chatHub';
import ChatSection from '@/components/custom/dashboard/chat/chatSection';
import DashboardLayout from '@/components/custom/dashboard/dashboardLayout';
import { SidebarTrigger } from '@/components/ui/sidebar';

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

  return (
    <DashboardLayout>
      {!activeChat && (
        <div className='flex flex-col p-2'>
          <SidebarTrigger className='size-10' />
          <div className='text-2xl font-bold m-auto px-15'>
            Select chat on the left side to display it's messages.
          </div>
        </div>
      )}

      {activeChat && <ChatSection />}
    </DashboardLayout>
  );
};

export default Dashboard;
