const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const { EXPLORER_WIDTH } = require('./config');
const fs = require('fs');

require('electron-reload')(__dirname, {
  electron: require(__dirname + '/node_modules/electron')
});

let width = 1200;
let height = 800; 
app.on('ready', () => {
  let win = new BrowserWindow({
    width, height,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html'); 

  // let view = new BrowserView()
  // let secondView = new BrowserView()
  // win.addBrowserView(view)
  // // win.addBrowserView(secondView)
  // view.setBounds({ x: EXPLORER_WIDTH, y: 0, width: width-EXPLORER_WIDTH, height });
  // view.webContents.loadURL('https://stackoverflow.com');
  // secondView.setBounds({ x: EXPLORER_WIDTH, y: 0, width: width-EXPLORER_WIDTH, height });
  // secondView.webContents.loadURL('https://google.com');

  // win.on('resize', () => {
  //   [width, height] = win.getSize();
  //   view.setBounds({ x: EXPLORER_WIDTH, y: 0, width: width-EXPLORER_WIDTH, height });
  // });

  // ipcMain.on('reload', () => {
  //   view.webContents.loadURL('https://stackoverflow.com');
  // });

  // let visible = true;
  // ipcMain.on('toggle', () => {
  //   if (visible) {
  //     win.removeBrowserView(view);
  //     visible = false;
  //   } else {
  //     win.addBrowserView(view);
  //     visible = true;
  //   }
  // });

});

ipcMain.on('save', (e, fileContent) => {
  console.log(fileContent);
  fs.writeFile('index.html', fileContent, err => {
    console.log(err);
  });
});

