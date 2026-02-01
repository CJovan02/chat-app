import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';

let connection: HubConnection | null = null;

const apiUrl = `${import.meta.env.VITE_API_BASE_URL ?? ''}/notificationHub`;

export async function startConnection() {
  if (connection) {
    return;
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl(apiUrl, { withCredentials: false })
    .withAutomaticReconnect()
    .build();

  try {
    await connection.start();
    console.log('SignalR connection started');
  } catch (error) {
    console.error('Error starting SignalR connection:', error);
    setTimeout(() => startConnection(), 5000);
  }
  return connection;
}

export function stopConnection() {
  if (connection) {
    connection.stop().then(() => {
      console.log('SignalR connection stopped');
      connection = null;
    });
  }
}
