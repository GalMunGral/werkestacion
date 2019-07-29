const { app, BrowserWindow } = require('electron');
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

