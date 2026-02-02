import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';

export type Callback = (data: any) => void;

export class SignalRService {
  private connection: HubConnection | null = null;
  // For each method name there can be multiple callbacks
  private callbacks: Record<string, Callback[]>;

  constructor(private url: string) {}

  public async start() {
    if (this.connection) return;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.url, { withCredentials: false })
      .withAutomaticReconnect()
      .build();

    this.connection.onreconnecting((err) =>
      console.warn('SignalR Reconnecting...', err),
    );
    this.connection.onreconnected(() => console.log('SignalR Reconnected!'));
    this.connection.onclose(() => console.log('SignalR Connection closed'));

    try {
      await this.connection.start();
      console.log('✅ SignalR connection started');
    } catch (error) {
      console.error('❌ Error starting SignalR connection:', error);
      setTimeout(() => this.start(), 5000);
    }
  }

  public stop() {
    if (!this.connection) return;

    this.connection?.stop().catch(console.error);
    this.connection = null;
    this.callbacks = {};
  }

  protected on(methodName: string, callback: Callback) {
    if (!this.connection) return;
    if (!this.callbacks[methodName]) this.callbacks[methodName] = [];
    this.callbacks[methodName].push(callback);

    this.connection.on(methodName, callback);
  }

  protected off(methodName: string, callback: Callback) {
    if (!this.connection) return;
    this.connection.off(methodName, callback);

    if (this.callbacks[methodName]) {
      this.callbacks[methodName] = this.callbacks[methodName].filter(
        (cb) => cb != callback,
      );
    }
  }

  protected invoke(methodName: string, ...args: any[]) {
    return this.connection?.invoke(methodName, args);
  }
}

export function stopConnection() {}
