const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipc: { ...ipcRenderer, on: ipcRenderer.on, once: ipcRenderer.once },
});

ipcRenderer.on('progress_status', (event, value) => {
  console.log(value);
});
