import { useUserStore } from '@/store/userStore';
import { useChatStore } from '@/store/chatStore';
import { useEffect, useMemo } from 'react';
import { useGetMessage } from '@/api/generated/message/message';
import { MessageResponse, ProblemDetails } from '@/api/generated/model';
import { mapMessageResponseToMessage } from '@/domain/models/message';

function useChatLogic() {
  const { user } = useUserStore();
  const activeChatId = useChatStore((state) => state.activeChatId);
  const addMessages = useChatStore((state) => state.addMessages);
  const messages = useChatStore((state) => {
    if (!state.activeChatId) return [];

    return state.chats[state.activeChatId]?.messages ?? [];
  });
  const activeChat = useChatStore((state) =>
    state.activeChatId ? state.chats[state.activeChatId] : null,
  );

  const {
    data,
    isPending: isLoading,
    isError,
    error,
    isSuccess: isLoaded,
  } = useGetMessage(
    {
      PageSize: 10,
      RoomId: activeChatId,
    },
    {
      query: { enabled: !!activeChatId },
    },
  );

  const queryData = data?.data;

  useEffect(() => {
    if (!isLoaded || !queryData || !activeChatId) return;

    const messageResponses = queryData as MessageResponse[];

    const messages = messageResponses.map(mapMessageResponseToMessage).reverse();

    addMessages(activeChatId, messages);
  }, [isLoaded, queryData, activeChatId]);

  const isMe = (userId: string) => {
    if (!user) return false;
    return userId === user.id;
  };

  function getErrorMessage(error: ProblemDetails) {
    console.error(error);
    return 'Error trying to load messages.';
  }

  return {
    messages,
    user,
    isMe,
    activeChat,
    isLoading,
    isLoaded,
    isError,
    isChatSelected: activeChatId === null,
    errorMessage: isError ? getErrorMessage(error) : null,
  };
}

export default useChatLogic;
