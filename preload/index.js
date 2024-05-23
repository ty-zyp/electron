const { contextBridge, ipcRenderer } = require('electron');

const sendUrl = async (url) => {
  let result = await ipcRenderer.invoke('on-url-event', url);
  return result;
}
const alert = async (msg) => {
  let result = await ipcRenderer.invoke('on-alert-event',msg);
  return result
}
const open = (url) => {
  ipcRenderer.invoke('on-open-event',url)
}
const getFileList = async () => {
  return await ipcRenderer.invoke('on-getfiles-event')
}

const openDialog = () => {
  console.log('12')
  ipcRenderer.send('on-openDialog-event')
}

const onRendererEvent = (cb) => {
  console.log('15')
  return new Promise((resolve, reject) => {
    ipcRenderer.on('on-renderer-event', (e,msg)=> {
      console.log('16')
      cb()
      resolve();
    })
  })
  
}

contextBridge.exposeInMainWorld('myApi', {
  sendUrl,
  alert,
  open,
  getFileList,
  openDialog,
  onRendererEvent
})
