import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const fs = window.require('fs');
const os = window.require('os');
const { ipcRenderer, remote } = window.require('electron');
// const { EXPLORER_WIDTH } = require('./cofig');

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
    // buffer.addEventListener('focus', () => {
    //   ipcRenderer.send('toggle');
    // })
    // buffer.addEventListener('blur', () => {
    //   ipcRenderer.send('toggle');
    // })
    document.querySelector('#search-btn').addEventListener('click', () => {
      new remote.BrowserWindow({
        width: 1000,
        height: 1000,
      }).loadURL('https://developer.mozilla.org/en-US/');
    });
    document.querySelector('#github').addEventListener('click', () => {
      new remote.BrowserWindow({
        width: 1000,
        height: 1000,
      }).loadURL('https://github.com');
    });
    document.querySelector('#save-btn').addEventListener('click', () => {
      ipcRenderer.send('save', buffer.value);
    });
    document.querySelector('#reload-btn').addEventListener('click', () => {
      ipcRenderer.send('reload');
    });
    document.querySelector('#toggle-btn').addEventListener('click', () => {
      ipcRenderer.send('toggle');
    });
  });
};


ReactDOM.render(
  <p>Hello!</p>,
  document.getElementById('root')
)
