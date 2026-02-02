import ChatHeader from '@/components/custom/dashboard/chat/chatHeader';
import ChatMessages from '@/components/custom/dashboard/chat/chatMessages';
import ChatInput from '@/components/custom/dashboard/chat/chatInput';
import useChatLogic, { UseChatLogicReturn } from '@/hooks/useChatLogic';

function ChatSection() {
  const logic: UseChatLogicReturn = useChatLogic();

  return (
    <>
      <ChatHeader activeChat={logic.activeChat} />

      <ChatMessages logic={logic} />

      <ChatInput logic={logic} />
    </>
  );
}

export default ChatSection;
