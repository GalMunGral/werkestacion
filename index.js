const fs = require('fs');
const os = require('os');
const { ipcRenderer, remote } = require('electron');

document.body.onload = () => {
  fs.readFile('index.html', (err, content) => {
    const buffer = document.querySelector('#editor')
    buffer.value = content.toString();
    
    buffer.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        let start = this.selectionStart;
        this.value = this.value.slice(0, this.selectionStart)
          + '  ' + this.value.slice(this.selectionEnd);
        this.selectionStart =  start + 2;
        this.selectionEnd = start + 2;
      }
    });
    document.querySelector('#search-btn').addEventListener('click', () => {
      new remote.BrowserWindow({
        width: 1000,
        height: 1000,
      }).loadURL('https://google.com');
    });
    document.querySelector('#save-btn').addEventListener('click', () => {
      ipcRenderer.send('save', buffer.value);
    });
  });
};
