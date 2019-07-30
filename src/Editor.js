import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const { dialog } = window.require('electron').remote;
const fs = window.require('fs');
const { resolve } = window.require('path');
const { ipcRenderer } = window.require('electron');

let openFilePath = null;
let textBuffer = null;
let selectAllFn = null;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background: #111111;
  color: #BBBBBB;
  font-size: 16px;
  font-family: 'PT Mono', monospace;
  padding: 20px 40px;
  box-sizing: border-box;
  border: none;
  outline: none;
  line-height: 20px;
  resize: none;
`;

const Editor = ({
  path: {
    dir, selectedFile
  }
}) => {
  if (!selectedFile) return null;
  
  const [state, setState] = useState({ loading: true, file: null, content: '' });

  if (selectedFile !== state.file) {
    setState({
      loading: true,
      file: selectedFile,
      content: ''
    });
    openFilePath = null;
    textBuffer = null;
    selectAllFn = null;
    return null;
  }
  if (state.loading) {
    const path = resolve(dir, selectedFile.name);
    fs.readFile(path, { encoding: 'utf8' }, (err, content) => {
      if (err) console.debug(err);
      console.debug('read:', content);
      setState({
        loading: false,
        file: state.file,
        content: !err ? content : ''
      });
    });
    openFilePath = null;
    textBuffer = null;
    selectAllFn = null;
    return null;
  }

  // Store reference to DOM element for text selection
  let textAreaRef = React.createRef();
  selectAllFn = () => {
    console.debug(textAreaRef);
    let element = textAreaRef.current;
    element.selectionStart = 0;
    element.selectionEnd = element.value.length;
  };

  // About to render
  openFilePath = resolve(dir, selectedFile.name);
  textBuffer = state.content;
  return <TextArea ref={textAreaRef} value={state.content} onChange={e => {
    setState({
      loading: false,
      file: state.file,
      content: e.target.value
    });
  }}/>
};
export default Editor;

ipcRenderer.on('save-file', () => {
  if (!openFilePath) return;
  console.debug(textBuffer);
  console.debug(openFilePath);
  // Write to file
  fs.writeFile(openFilePath, textBuffer, (err) => {
    if (err) {
      console.debug(err);
    } else {
      console.debug('File Saved');
      dialog.showMessageBox({
        message: 'Changes saved!\n' + openFilePath
      })
    }
  })
});

ipcRenderer.on('select-all', () => {
  if (selectAllFn && typeof selectAllFn === 'function') {
    selectAllFn();
  }
})