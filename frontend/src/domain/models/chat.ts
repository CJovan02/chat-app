import { ChatItemResponse, MessageResponse } from '@/api/generated/model';
import { mapLastMessageToMessage, Message } from '@/domain/models/message';

export type Chat = {
  id: string;
  name: string;
  otherUserId: string;
  otherUserDisplayName: string;
  fetched: boolean;
  messages: Message[];
};

export function mapChatItemResponseToChat(item: ChatItemResponse): Chat {
  return {
    id: item.roomId,
    otherUserId: item.otherUserId,
    otherUserDisplayName: item.otherUserDisplayName,
    name: item.otherUserDisplayName,

    messages:
      item.lastMessage === undefined || item.lastMessage === null
        ? []
        : [mapLastMessageToMessage(item.lastMessage)],
    fetched: false,
  };
}
