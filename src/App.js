import React, { useState } from 'react';
import styled from 'styled-components';
import Explorer from './Explorer';
import Editor from './Editor';

const fs = window.require('fs');
const os = window.require('os');

const SplitScreen = styled.div`
  position: fixed;
  top: 0; bottom: 0; left: 0; right: 0;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 350px auto;
  grid-template-areas: "left main";
  & ::-webkit-scrollbar {
    display: none;
  }
`;

const Left = styled.div`
  grid-area: left;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #222222;
`;

const Main = styled.div`
  grid-area: main;
  height: 100vh;
  background: #222222;
`;

const App = () => {
  const [path, setPath] = useState({
    dir: '', files: [], selectedFile: null
  });
  console.debug(path)
  if (!path.dir) {
    fs.readdir(os.homedir(), { withFileTypes: true }, (err, files) => {
      if (err) { console.debug(err); return; }
      setPath({
        dir: os.homedir(), files,
        selectedFile: files[0]
      });
    })
  };

  return (
    <SplitScreen>
      <Left><Explorer path={path} setPath={setPath}/></Left>
      <Main><Editor path={path}/></Main>
    </SplitScreen>
  );
}

export default App;