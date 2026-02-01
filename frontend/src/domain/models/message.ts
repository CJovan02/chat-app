import { ChatItemLastMessage, MessageResponse } from '@/api/generated/model';

export type Message = {
  id: string;
  senderId: string;
  text: string;
  sentAt: Date;
};

export function mapMessageResponseToMessage(mess: MessageResponse): Message {
  return {
    id: mess.id,
    text: mess.text,
    senderId: mess.senderId,
    sentAt: new Date(mess.sentAt),
  };
}

export function mapLastMessageToMessage(mess: ChatItemLastMessage): Message {
  return {
    ...mess,
    sentAt: new Date(mess.sentAt),
  };
}
