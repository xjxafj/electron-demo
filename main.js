
const { app, BrowserWindow,Menu  } = require('electron')
//解决浏览器发出警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
//解决electron 引入electron-edge-js模块时报错  Error: Loading non-context-aware native module in renderer
app.allowRendererProcessReuse=false

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: false,
    frame: true,
    resizable: true,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true
    }
  })

  //定义主菜单
  require("./main/main_menu.js")

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(()=>{
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
