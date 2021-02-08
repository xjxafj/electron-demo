const { app ,Menu  } = require('electron')
var menuTemp=[
    {label: '退出',accelerator:'ctrl+n',click:()=>{exit_app();} },
    {label: '测试',
      submenu: [
        { label: 'Basic' },
        { label: 'Pro' }
      ]
    }
]
const dockMenu = Menu.buildFromTemplate(menuTemp);
//构建的主菜单作用在主程序中
Menu.setApplicationMenu(dockMenu);
//app.dock.setMenu(dockMenu)

function exit_app() {
    if (process.platform !== 'darwin') {
        app.quit();
      }
}
