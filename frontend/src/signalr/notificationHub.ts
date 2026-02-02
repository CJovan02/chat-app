import { Callback, SignalRService } from '@/signalr/signalRService';
import { MessageRequest } from '@/api/generated/model';

//const apiUrl = `${import.meta.env.VITE_API_BASE_URL ?? ''}/notificationHub`;
const apiUrl = 'http://localhost:5181/notificationHub';

class MessageNotificationsHub extends SignalRService {
  constructor() {
    super(apiUrl);
  }

  onReceiveMessage(callback: Callback) {
    this.on('ReceiveMessage', callback);
  }

  joinRoom(roomId: string) {
    return this.invoke('JoinRoom', roomId);
  }

  sendMessage(request: MessageRequest) {
    return this.invoke('SendMessage', JSON.stringify(request));
  }
}