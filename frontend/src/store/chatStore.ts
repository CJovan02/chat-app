import { Chat } from '@/domain/models/chat';
import { Message } from '@/domain/models/message';
import { create } from 'zustand';

type ChatStore = {
  // For easier lookup of active chat object I used Record
  chats: Record<string, Chat>;
  activeChatId: string | null;

  setChats: (chats: Chat[]) => void;
  setActiveChat: (id: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  setChatFetched: (chatId: string) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: {},
  activeChatId: null,

  setChats: (chats) =>
    set({
      chats: Object.fromEntries(chats.map((chat) => [chat.id, chat])),
    }),

  setActiveChat: (id) => set({ activeChatId: id }),

  addMessage: (chatId, message) =>
    set((state) => ({
      chats: {
        ...state.chats,
        [chatId]: {
          ...state.chats[chatId],
          messages: [...state.chats[chatId].messages, message],
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
