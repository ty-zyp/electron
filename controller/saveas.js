const { Menu, dialog } = require('electron');
const fs = require('fs')
const got = require('got').default;
const path = require('path');
const imageType = require('image-type');
const randomstring = require('randomstring')
function saveas (url) {
  console.log(url)
  if (url) {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '图片另存为。。。',
        click: () => {
          got.get(url).then(res => {
            const chunk = Buffer.from(res.rawBody);
            const imgType = imageType(chunk);

            dialog.showSaveDialog({
              title: "请选择要保存的文件名",
              defaultPath:path.resolve(__dirname,'../public/uploads/'+randomstring.generate(10)+'.'+imgType.ext),
              buttonLabel: "保存",
            }).then(result => {
              const { filePath, canceled } = result;
              if (!canceled) {
                fs.writeFileSync(filePath,chunk)
              }
            }).catch(err => {
              console.log(err)
            })
          }).catch((e) => {
            console.log(e)
          })
        },
        label:'保存',
        accelerator:'Shift+Alt+N'
      }
    ])
    contextMenu.popup();
  }
}
module.exports = saveas;