const { app, BrowserWindow } = require('electron');
// import { app, BrowserWindow } from 'electron';
// import WinState from 'electron-win-state'
const WinState = require('electron-win-state').default;
const path = require('path');
require('./controller/getSource')
require('./controller/alert')
require('./controller/openWindow')
require('./controller/getFileList')
require('./controller/buildMenu')
const createTray = require('./tray');

const createWindow = () => {
  const winState = new WinState({ 
    defaultWidth: 800,
    defaultHeight: 600,
    electronStoreOptions:{ name: 'window-open-main' }
  })
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    show:false, // 默认不显示窗体
    // frame:false, // 只显示内容，隐藏默认菜单栏
    // 自定义窗口大小和状态
    ...winState.winOptions,
    // autoHideMenuBar:true, // 隐藏menu菜单
    webPreferences: {
      // 预加载
      preload:path.resolve(__dirname,'./preload/index.js')
    }
  });

  win.loadURL('http://localhost:5173')
  // 打开开发工具
  const wc = win.webContents;
  wc.openDevTools();
  winState.manage(win);
  win.on('ready-to-show', () => {
    win.show();
  })
  // getSource();
  // 执行托盘
  createTray(app,win);
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})