import React, { useState } from 'react';
import styled from 'styled-components';
const fs = window.require('fs');
const { resolve } = window.require('path');

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
    return null;
  }
  console.debug('about to render');
  return <TextArea defaultValue={state.content}/>
};
export default Editor;
