import React, { useState } from 'react';
import styled from 'styled-components';
const fs = window.require('fs');
const os = window.require('os');
const { resolve } = window.require('path');
const { ipcRenderer } = window.require('electron');

var curDirectory;
var setPathFn;

const List = styled.ul`
  padding: 0;
  margin: 15px 0;
  user-select: none;
`;
const Entry = styled.li`
  line-height: 22px;
  padding: 0 20px;
  font-family: sans-serif;
  cursor: default;
  list-style-type: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ isDirectory }) => isDirectory ? 'gray' : 'lightgray'};
  font-style: ${({ isDirectory }) => isDirectory ? 'italic' : 'normal'};
  font-weight: ${({ isDirectory }) => isDirectory ? 'bold' : 'normal'};
  background: ${({ selected }) => selected ? '#444444' : 'transparent'};
  :hover {
    background: #444444;
  }
`;
const SpecialEntry = styled.div`
  padding: 0 20px;
  font-family: sans-serif;
  font-size: 17px;
  color: white;
  line-height: 30px;
  font-weight: bolder;
  :hover {
    background: #444444;
  }
`;
const TopItem = styled.div`
  flex: 0 0 50px;
  background: #333333;
  user-select: none;
  cursor: default;
`;
const BottomItems = styled.div`
  flex: 0 0 auto;
`;
const Column = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;
const Scrollable = styled.div`
  flex: auto;
  overflow: scroll;
  margin: 0;
  padding: 0;
`;
const Button = styled.div`
  background: ${({ secondary }) => secondary ? '#008B8B' : '#0066CC'};
  padding: 7px 0;
  font-family: sans-serif;
  color: white;
  font-weight: bold;
  text-align: center;
  user-select: none;
  cursor: pointer;
`;

const loadDirectory = (directory, setPathCallback) => {
  if (!setPathCallback || typeof setPathCallback !== 'function') return;
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) { console.debug(err); return; }
    setPathCallback({
      dir: directory, files,
      selectedFile: null
    });
  });
}

const Explorer = ({
  path: { dir, files, selectedFile },
  setPath
}) => {
  curDirectory =
  setPathFn = setPath;
  return (
    <Column>
      <TopItem>
          <SpecialEntry key={-2} onClick={() => {
            loadDirectory(resolve(dir, '..'), setPath);
          }}>[ Parent Directory ]</SpecialEntry>
          <SpecialEntry key={-1} onClick={() => {
            loadDirectory(os.homedir(), setPath);
          }}>[ Home ]</SpecialEntry>
        </TopItem>
      <Scrollable>
      <List>
        {files.map((f, i) => (
          <Entry key={i} selected={f === selectedFile} isDirectory={f.isDirectory()}
            onClick={() => {
              if (f.isDirectory()) {
                loadDirectory(resolve(dir, f.name), setPath);
              } else {
                setPath({
                  dir, files,
                  selectedFile: f
                });
              }   
            }}
          >{f.name}</Entry>
        ))}
      </List>
      </Scrollable>
      <BottomItems>
        <Button secondary onClick={() => {
          ipcRenderer.send('reload-browser-view');
        }}>
          Reload Browser View
        </Button>
        <Button onClick={() => {
          ipcRenderer.send('toggle-browser-view');
        }}>
          Toggle Browser View
        </Button>
      </BottomItems>
    </Column>
  );
}

export default Explorer;

ipcRenderer.on('navigate-to-parent', () => {
  loadDirectory(resolve(curDirectory, '..'), setPathFn);
});
