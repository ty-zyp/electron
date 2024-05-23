const { contextBridge, ipcRenderer } = require('electron');

const close = async () => {
  await ipcRenderer.invoke('on-close-event')
}

contextBridge.exposeInMainWorld('myItemApi', {
  close
})
