const { app, BrowserWindow, BrowserView, ipcMain, Menu } = require('electron');
const { EXPLORER_WIDTH } = require('./config');

// require('electron-reload')(__dirname, {
//   electron: require(__dirname + '/node_modules/electron')
// });

const HOME_URL = 'https://www.google.com';
let width = 1200;
let height = 800; 
let visible = false;


app.on('ready', () => {
  let win = new BrowserWindow({
    width, height,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html'); 

  let view = new BrowserView()
  view.webContents.loadURL(HOME_URL);
  
  win.on('resize', () => {
    [width, height] = win.getSize();
    view.setBounds({ x: EXPLORER_WIDTH, y: 0, width: width-EXPLORER_WIDTH, height });
  });


  ipcMain.on('toggle-browser-view', () => {
    console.log('TOGGLE', 'current value:', visible);
    if (visible) {
      win.removeBrowserView(view);
      visible = false;
    } else {
      win.addBrowserView(view);
      view.setBounds({ x: EXPLORER_WIDTH, y: 0, width: width-EXPLORER_WIDTH, height });
      visible = true;
    }
  });

  ipcMain.on('reload-browser-view', () => {
    view.webContents.loadURL(HOME_URL);
  });

  const menu = Menu.buildFromTemplate([{
    label: app.getName()
  },{
    label: 'Go to',
    submenu: [{
      label: 'Parent Directory',
      accelerator: 'CmdOrCtrl+Left',
      click: () => win.webContents.send('navigate-to-parent')
    }]
  }])
  Menu.setApplicationMenu(menu);
});

// ipcMain.on('save', (e, fileContent) => {
//   console.log(fileContent);
//   fs.writeFile('index.html', fileContent, err => {
//     console.log(err);
//   });
// });

