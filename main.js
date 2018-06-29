const electron = require('electron'),
    path = require("path"),
    url = require("url"),
    getPort = require("get-port"),
    yeedServer = require("./yggdrash-chain/src/server");


getPort().then(port => {
    const server = yeedServer.app.listen(port, () =>{
        console.log(`Running yggdrash node on : http://localhost:${port}`);
    });
    
    yeedServer.startP2PServer(server);
    global.sharedPort = port;
});  

const { app, BrowserWindow } = electron;

let mainWindow;
const createWindow = () => {

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Yggdrash Wallet"
    });

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
};

app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });
  
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  });

app.on("ready", createWindow);