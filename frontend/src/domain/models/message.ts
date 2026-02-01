import { ChatItemLastMessage, MessageResponse } from '@/api/generated/model';

export type Message = {
  id: string;
  senderId: string;
  text: string;
  sentAt: string;
};

export function mapMessageResponseToMessage(mess: MessageResponse): Message {
  return {
    id: mess.id,
    text: mess.text,
    senderId: mess.senderId,
    sentAt: mess.sentAt,
  };
}

export function mapLastMessageToMessage(mess: ChatItemLastMessage): Message {
  return {
    ...mess,
  };
}
