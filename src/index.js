import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const { Menu, MenuItem } = window.require('electron').remote;

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);
