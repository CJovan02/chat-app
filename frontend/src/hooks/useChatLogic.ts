import { useUserStore } from '@/store/userStore';
import { useChatStore } from '@/store/chatStore';
import { useCallback, useEffect, useMemo } from 'react';
import { useGetMessage } from '@/api/generated/message/message';
import {
  MessageRequest,
  MessageResponse,
  ProblemDetails,
  UserResponse,
} from '@/api/generated/model';
import {
  mapMessageDomainToRequest,
  mapMessageResponseToMessage,
  Message,
} from '@/domain/models/message';
import ChatHub from '@/signalr/chatHub';
import { Chat } from '@/domain/models/chat';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  text: z.string().max(200, "Message can't be longer than 200 characters"),
});
type FormValues = z.infer<typeof formSchema>;

export type UseChatLogicReturn = {
  messages: Message[];
  user: UserResponse;
  isMe: (userId: string) => boolean;
  activeChat: Chat;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  isChatSelected: boolean;
  errorMessage: string;
  sendMessageToCurrentChat: (data: FormValues) => Promise<void>;
  form: UseFormReturn<
    {
      text: string;
    },
    any,
    {
      text: string;
    }
  >;
};

function useChatLogic(): UseChatLogicReturn {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const { user } = useUserStore();
  const activeChatId = useChatStore((state) => state.activeChatId);
  const addMessages = useChatStore((state) => state.addMessages);
  const addMessage = useChatStore((state) => state.addMessage);
  const messages = useChatStore((state) => {
    if (!state.activeChatId) return [];

    const chat: Chat = state.chats[state.activeChatId];
    return chat.messages;
  });
  const activeChat = useChatStore((state) =>
    state.activeChatId ? state.chats[state.activeChatId] : null,
  );

  const hub = ChatHub.getInstance();

  useEffect(() => {
    async function configure() {
      hub.onReceiveMessage(handleReceivedMessage);
    }

    configure();
  }, []);

  const handleReceivedMessage = useCallback(
    (data: any) => {
      if (!activeChatId) return;

      if (data.isFailiure) console.error('Error sending message', data.error);
      if (!data.isSuccess) console.error('Unknown error');

      const message = mapMessageResponseToMessage(
        data.value as MessageResponse,
      );
      addMessage(message);
      form.reset();
    },
    [activeChatId, addMessage, form],
  );

  async function sendMessageToCurrentChat(data: FormValues) {
    if (!activeChatId || !user) return;

    const request: MessageRequest = {
      text: data.text,
      senderId: user.id,
      roomId: activeChatId,
    };
    await hub.sendMessage(request);
  }

  useEffect(() => {
    if (!activeChatId) return;

    async function join() {
      await hub.joinRoom(activeChatId);
    }

    join();
  }, [activeChatId]);

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

    const msgs = messageResponses.map(mapMessageResponseToMessage).reverse();

    addMessages(activeChatId, msgs);
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
    form,
    messages,
    user,
    isMe,
    activeChat,
    isLoading,
    isLoaded,
    isError,
    sendMessageToCurrentChat,
    isChatSelected: !!activeChatId,
    errorMessage: isError ? getErrorMessage(error) : null,
  };
}

export default useChatLogic;
