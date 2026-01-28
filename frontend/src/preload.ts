import { ipcRenderer } from 'electron';

export const IPC_CHANNELS = {
  START_ORPC_SERVER: 'start-orpc-server',
};

window.addEventListener('message', (event) => {
  if (event.data === IPC_CHANNELS.START_ORPC_SERVER) {
    const [serverPort] = event.ports;

    ipcRenderer.postMessage(IPC_CHANNELS.START_ORPC_SERVER, null, [serverPort]);
  }
});
