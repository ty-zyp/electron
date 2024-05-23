const { ipcMain,BrowserWindow } = require('electron');

const getSource = (url) => {
  return new Promise((res, rej) => {
      const win = new BrowserWindow({
        width: 500,
        height: 500,
        show: false,
        webPreferences: {
          offscreen: true,
          
        }
      });
      win.loadURL(url);
  
      win.webContents.on('did-finish-load', async () => {
        const title = win.getTitle();
        try {
          const img = await win.webContents.capturePage();
          const screenshot = img.toDataURL();
          res({
            title,screenshot,url,errorUrl:img.isEmpty()
          })
        } catch (e) {
          console.log('error',e)
          rej(e)
        }
     
      })
    // })
  })
}

ipcMain.handle('on-url-event', async(e, url) => {
  const result = await getSource(url);
  return result;
})

module.exports = getSource;