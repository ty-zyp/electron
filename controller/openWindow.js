const { ipcMain, BrowserWindow } = require('electron');
const path = require('path')
const saveas = require('./saveas');
const WinState = require('electron-win-state').default;
const cssText = `width:60px;height:30px;background-color:cornflowerblue;border-radius:5px;text-align:center;line-height:30px;position:fixed;bottom:10px;right:10px;z-index: 999;cursor: pointer;color: #fff;`
const js = `
  const btn = document.createElement('div')
  btn.id = 'readit-button'
  btn.innerHTML = '关闭窗口'
  document.body.appendChild(btn)
  btn.style.cssText = '${cssText}'
  btn.addEventListener('click',()=>{
    console.log('关闭窗口')
    window.myItemApi.close()
  })
`
let win;
ipcMain.handle('on-open-event', (e, url) => {
  const winState = new WinState({
    defaultWidth: 800,
    defaultHeight: 800,
    electronStoreOptions:{ name: 'window-open' } // 隔离
  })
  win = new BrowserWindow({
    width: 600,
    height: 400,
    show: false,
    autoHideMenuBar:true, // 隐藏menu菜单
    ...winState.winOptions,
    webPreferences: {
      // 预加载
      preload:path.resolve(__dirname,'../preload/open.js')
    }
  
  });

  win.on('ready-to-show', () => {
    win.show()
  })
  win.loadURL(url);
  winState.manage(win)

  win.webContents.executeJavaScript(js).catch((e)=>{console.log('---',e)})
  // 打开开发工具
  const wc = win.webContents;
  wc.openDevTools();

  win.webContents.on('context-menu', (e, args) => {
    saveas(args.srcURL)
  })

})

ipcMain.handle('on-close-event', () => {
  win.close();
})

