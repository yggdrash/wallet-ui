const electron = require('electron'),
    path = require("path"),
    url = require("url"),
    openAboutWindow = require('about-window').default,
    windowStateKeeper = require('electron-window-state'),
    getPort = require("get-port"),
    yeedServer = require("./yggdrash-chain/src/server");


getPort().then(port => {
    const server = yeedServer.app.listen(port, () =>{
        console.log(`Running yggdrash node on : http://localhost:${port}`);
    });
    
    yeedServer.startP2PServer(server);
    global.sharedPort = port;
});  

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let enableScreenshotProtection = true
let template = null
let deeplinkingUrl = null


const shouldQuit = app.makeSingleInstance((argv, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
  
    // argv: An array of the second instance’s (command line / deep linked) arguments
    if (process.platform !== 'darwin') {
      deeplinkingUrl = argv[2]
      broadcastURI(deeplinkingUrl)
    }
  
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
  
  if (shouldQuit) {
    app.exit()
  }

  
const createWindow = () => {

    // mainWindow = new BrowserWindow({
    //     width: 1200,
    //     height: 800,
    //     title: "Yggdrash Wallet"
    // });
    const ENV = process.env.ENV;

    const iconpath = path.resolve(__dirname, '/client/src/assets/images/ygg-logo-green.png')
    let { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  
    let mainWindowState = windowStateKeeper({
      defaultWidth: width - 100,
      defaultHeight: height - 100
    })

    mainWindow = new BrowserWindow({width: mainWindowState.width, height: mainWindowState.height, x: mainWindowState.x, y: mainWindowState.y, center: true, icon: iconpath, resizable: true, frame: true, show: false,  title: "Yggdrash Wallet"})
    mainWindow.setContentProtection(true)
    mainWindowState.manage(mainWindow)

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.on('did-finish-load', () => {
        if (deeplinkingUrl) broadcastURI(deeplinkingUrl)
    })

    const about = {
        role: 'about',
        click: () => openAboutWindow({
          icon_path: `${__dirname}/client/src/assets/images/ygg-logo-green.png`,
          package_json_dir: __dirname,
          copyright: 'Copyright (c) 2018 YGGDRASH',
          homepage: 'https://yggdrash.io/',
          bug_report_url: 'https://github.com/yggdrash/yggdrash-wallet/issues'
        })
    }
    
    const screenshotProtection = {
        label: getScreenshotProtectionLabel(),
        click: () => { updateScreenshotProtectionItem() }
    }

    template = [
        {
          label: "Yggdrash Wallet",
          submenu: [
            {
              label: "About Yggdrash Wallet",
              role: "about"
            },
            {
              type: "separator"
            },
            {
              label: "Services",
              role: "services",
              submenu: []
            },
            {
              type: "separator"
            },
            {
              label: "Hide Yggdrash Wallet",
              accelerator: "Command+H",
              role: "hide"
            },
            {
              label: "Hide Others",
              accelerator: "Command+Shift+H",
              role: "hideothers"
            },
            {
              label: "Show All",
              role: "unhide"
            },
            {
              type: "separator"
            },
            {
              label: "Quit",
              accelerator: "Command+Q",
              click: function() {
                app.quit();
              }
            }
          ]
        },
        {
            label: 'File',
            submenu: [
              screenshotProtection,
              { type: 'separator' },
              { role: 'quit' }
            ]
        },
        {
          label: "Edit",
          submenu: [
            {
              label: "Undo",
              accelerator: "CmdOrCtrl+Z",
              role: "undo"
            },
            {
              label: "Redo",
              accelerator: "Shift+CmdOrCtrl+Z",
              role: "redo"
            },
            {
              type: "separator"
            },
            {
              label: "Cut",
              accelerator: "CmdOrCtrl+X",
              role: "cut"
            },
            {
              label: "Copy",
              accelerator: "CmdOrCtrl+C",
              role: "copy"
            },
            {
              label: "Paste",
              accelerator: "CmdOrCtrl+V",
              role: "paste"
            },
            {
              label: "Select All",
              accelerator: "CmdOrCtrl+A",
              role: "selectall"
            }
          ]
        }, {
            role: 'window',
            submenu: [
              { role: 'minimize' },
              { role: 'close' }
            ]
          },
          {
            role: 'help',
            submenu: [
              {
                label: 'Learn More',
                click () { require('electron').shell.openExternal('https://yggdrash.io') }
              },
              { label: 'Reload App', accelerator: 'CmdOrCtrl+R', click: function () { mainWindow.reload() } },
              { label: 'Open Dev Tools', accelerator: 'CmdOrCtrl+D', click: function () { mainWindow.webContents.openDevTools() } }
            ]
          }
      ];


    if (process.platform === 'darwin') {
    template[0] = {
        label: app.getName(),
        submenu: [
        about,
        { type: 'separator' },
        screenshotProtection,
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
        ]
    }
    template[2].submenu = [
        { role: 'minimize' },
        { role: 'zoom' },
        { role: 'togglefullscreen' }
    ]
    } else if (process.platform === 'linux') {
    template[0] = {
        label: 'File',
        submenu: [
        { role: 'quit' }
        ]
    }
    template[3].submenu.unshift(about, { type: 'separator' })
    } else {
    template[3].submenu.unshift(about, { type: 'separator' })
    }

    // menu = Menu.buildFromTemplate(template)
    // Menu.setApplicationMenu(menu)


    if(ENV === "dev"){
        mainWindow.loadURL("http://localhost:3000");
        // mainWindow.webContents.openDevTools();
    }else{
        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname,"build/index.html"), //react
                protocol: "file",
                slashes: true
            })
        )
    }
};

function configureReload () {
    elemon({
      app: app,
      mainFile: 'main.js',
      bws: [
        { bw: mainWindow, res: ['index.html'] }
      ]
    })
  }

function updateScreenshotProtectionItem () {
    if (menu == null || template == null) {
      return
    }
  
    enableScreenshotProtection = !enableScreenshotProtection
    mainWindow.setContentProtection(enableScreenshotProtection)
  
    let index = process.platform === 'darwin' ? 2 : 0
    template[0].submenu[index].label = getScreenshotProtectionLabel()
  
    menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }
  
function getScreenshotProtectionLabel () {
    if (process.platform === 'linux') {
      return 'Screenshot Protection Not Available On Linux'
    } else if (enableScreenshotProtection) {
      return 'Disable screenshot protection (unsafe)'
    } else {
      return 'Enable screenshot protection (recommended)'
    }
}

function shouldDisableScreenshotProtection (arugments) {
    return arugments && arugments.some(v => v && typeof v === 'string' && v.toLowerCase() === '--disablescreenshotprotection')
}
  
app.setAsDefaultProtocolClient('ark', process.execPath, ['--'])
app.on('ready', () => {
    createWindow()

    if (process.env.LIVE_RELOAD) {
        configureReload()
    }

    if (shouldDisableScreenshotProtection(process.argv)) {
        updateScreenshotProtectionItem()
    }
})

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


app.on('open-url', (event, url) => {
    // Protocol handler for osx
    event.preventDefault()
    deeplinkingUrl = url
    broadcastURI(deeplinkingUrl)
});

function broadcastURI (uri) {
    if (!uri || typeof uri !== 'string') return
  
    if (mainWindow && mainWindow.webContents) mainWindow.webContents.send('uri', uri)
};
  