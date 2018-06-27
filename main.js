const windowStateKeeper = require('electron-window-state')
const electron = require('electron'),
    path = require("path"),
    url = require("url");

const { app, BrowserWindow } = electron;

let mainWindow;

const createWindow = () => {

    mainWindow = new BrowserWindow({
        width: mainWindowState.width, 
        height: mainWindowState.height,
        title: "Yggdrash Wallet"
    });

    let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

    let mainWindowState = windowStateKeeper({
      defaultWidth: width - 100,
      defaultHeight: height - 100
    })

    const ENV = process.env.ENV;

    if(ENV === "dev"){
        mainWindow.loadURL("http://localhost:3000");
    }else{
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname,"client/build/index.html"), //react
                protocol: "file",
                slashes: true
            })
        )
    }



    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
          app.quit()
        }
      })
      
      app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
          createWindow()
        }
      })
}