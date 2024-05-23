const { Tray,Menu } = require('electron');
// 托盘
function createTray (app,win) {
  const tray = new Tray('./ty.png');
  tray.setToolTip('我的应用');
  tray.on('click', (e) => { // 按住shfit键，点击托盘图标，关闭应用；
    if (e.shiftKey) {
      app.quit();
    } else {
      win.isVisible() ? win.hide() : win.show();
    }
  })
  tray.setContextMenu(Menu.buildFromTemplate(
    // [  // 托盘右键
    //   {label:'item 1'},
    //   {label:'item 2',click:()=>{console.log('托盘菜单事件2')}},
    // ]
  ))
}
module.exports = createTray;