import { useChatStore } from '@/store/chatStore';
import { useCallback, useState } from 'react';
import {
  getUserUserIdChats,
  useGetUserUserIdChats,
} from '@/api/generated/user/user';
import { useUserStore } from '@/store/userStore';

export enum ChatsState {
  init,
  loading,
  loaded,
  error,
}

export const useChatLogic = () => {
  const { user } = useUserStore();
  const { setChats, setActiveChat: setActiveChatStore } = useChatStore();
  const chats = useChatStore((state) => state.chats);
  const activeChatId = useChatStore((state) => state.activeChatId);
  const [state, setState] = useState<ChatsState>(ChatsState.init);
  const [error, setError] = useState<Error | null>(null);

  // fetches chats from backend and loads it in store
  const fetchChats = useCallback(async () => {
    if (state !== ChatsState.init && state !== ChatsState.error) return;

    setState(ChatsState.loading);

    try {
      const response = await getUserUserIdChats(user.id);

      setChats(response.data);

      setState(ChatsState.loaded);
    } catch (error) {
      console.error(error);
      setState(ChatsState.error);
      setError(error as Error);
    }
  }, [state, setChats, user.id]);

  const setActiveChat = useCallback(
    (chatId: string) => {
      if (state !== ChatsState.loaded) return;

      setActiveChatStore(chatId);
    },
    [state, setActiveChatStore],
  );

  const getActiveChat = useCallback(() => {
    return chats[activeChatId];
  }, [chats, activeChatId]);

  return { chats, activeChatId, setActiveChat, getActiveChat, fetchChats };
};
