import { useChatStore } from '@/store/chatStore';
import { useCallback, useEffect, useState } from 'react';
import { useGetUserUserIdChats } from '@/api/generated/user/user';
import { useUserStore } from '@/store/userStore';
import { Chat } from '@/domain/models/chat';

export const useChatLogic = () => {
  const { user } = useUserStore();
  const { setChats, setActiveChat: setActiveChatStore } = useChatStore();
  const chats = useChatStore((state) => state.chats);
  const activeChatId = useChatStore((state) => state.activeChatId);

  const query = useGetUserUserIdChats(user.id);
  const queryData = query.data?.data;

  const uiStates = {
    isError: query.isError,
    isLoaded: query.isSuccess,
    isLoading: query.isPending,
    errorMessage: getErrorMessage(query.error),
  };

  function getErrorMessage(error: any) {
    if (error instanceof Error) {
      console.error(error);
    }
    return 'Error trying to load your chats, please try again.';
  }

  useEffect(() => {
    if (!queryData) return;

    if (uiStates.isLoaded) {
      setChats(query.data.data);
    }
  }, [queryData, setChats, uiStates.isLoaded]);

  const setActiveChat = useCallback(
    (chatId: string) => {
      if (uiStates.isLoading) return;

      setActiveChatStore(chatId);
    },
    [setActiveChatStore, uiStates.isLoading],
  );

  const getActiveChat = useCallback(() => {
    if (!uiStates.isLoaded) return;

    return chats[activeChatId];
  }, [chats, activeChatId, uiStates.isLoaded]);

  const isChatActive = useCallback(
    (chatId: string) => {
      if (!uiStates.isLoaded) return;

      return chatId === activeChatId;
    },
    [activeChatId, uiStates.isLoaded],
  );

  const { refetch } = query;

  return {
    refetch,
    chats,
    activeChatId,
    ...uiStates,
    setActiveChat,
    getActiveChat,
    isChatActive,
  };
};

// Util functions for chat logic. This could go into separate file
export function getLastMessageFromChat(chat: Chat) {
  return chat.messages[0];
}
