const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

require('electron-reload')(__dirname, {
  electron: require(__dirname + '/node_modules/electron')
});
app.on('ready', () => {
  new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  }).loadFile('index.html');

});

ipcMain.on('save', (e, fileContent) => {
  console.log(fileContent);
  fs.writeFile('index.html', fileContent, err => {
    console.log(err);
  });
});
