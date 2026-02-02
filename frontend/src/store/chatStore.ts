import { Chat, mapChatItemResponseToChat } from '@/domain/models/chat';
import { Message } from '@/domain/models/message';
import { create } from 'zustand';
import { ChatItemResponse } from '@/api/generated/model';

type ChatStore = {
  // For easier lookup of active chat object I used Record
  chats: Record<string, Chat>;
  activeChatId: string | null;

  setChats: (chats: ChatItemResponse[]) => void;
  setActiveChat: (id: string) => void;
  addMessage: (message: Message) => void;
  addMessages: (chatId: string, messages: Message[]) => void;
  setChatFetched: (chatId: string) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: {},
  activeChatId: null,

  setChats: (items) =>
    set({
      chats: Object.fromEntries(
        items.map((item) => [item.roomId, mapChatItemResponseToChat(item)]),
      ),
    }),

  setActiveChat: (id) => set({ activeChatId: id }),

  addMessages: (chatId, messages) =>
    set((state) => ({
      chats: {
        ...state.chats,
        [chatId]: {
          ...state.chats[chatId],
          messages,
        },
      },
    })),

  addMessage: (message) =>
    set((state) => ({
      chats: {
        ...state.chats,
        [state.activeChatId]: {
          ...state.chats[state.activeChatId],
          messages: [...state.chats[state.activeChatId].messages, message],
        },
      },
    })),

  setChatFetched: (chatId) =>
    set((state) => ({
      chats: {
        ...state.chats,
        [chatId]: {
          ...state.chats[chatId],
          fetched: true,
        },
      },
    })),
}));
