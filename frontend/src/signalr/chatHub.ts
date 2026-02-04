import { Callback, SignalRService } from '@/signalr/signalRService';
import { MessageRequest, MessageResponse } from '@/api/generated/model';
import { API_BASE_URL } from '@/api/axiosInstance';

const apiUrl = API_BASE_URL + '/chatHub';

// Singleton
class ChatHub extends SignalRService {
  private static instance: ChatHub;
  private joinedRooms: Record<string, string> = {};

  private constructor() {
    super(apiUrl);
  }

  public static getInstance(): ChatHub {
    if (!ChatHub.instance) {
      ChatHub.instance = new ChatHub();
    }

    return ChatHub.instance;
  }

  public onReceiveMessage(callback: Callback) {
    this.on('ReceiveMessage', callback);
  }

  public joinRoom(roomId: string) {
    if (this.joinedRooms[roomId]) {
      console.log('Already joined that room, ignoring');
      return;
    }

    console.log('Joining room', roomId);
    this.joinedRooms[roomId] = roomId;

    return this.invoke('JoinRoom', roomId);
  }

  public sendMessage(request: MessageRequest) {
    return this.invoke('SendMessage', request);
  }
}

export default ChatHub;
