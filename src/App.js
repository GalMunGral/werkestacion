import React, { useState } from 'react';
import styled from 'styled-components';
import Explorer from './Explorer';
const fs = window.require('fs');
const os = window.require('os');

const SplitScreen = styled.div`
  position: fixed;
  top: 0; bottom: 0; left: 0; right: 0;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 350px auto;
  grid-template-areas: "left main"
`;

const Left = styled.div`
  grid-area: left;
  height: 100%;
  background: gray;
`;

const Main = styled.div`
  grid-area: main;
  height: 100%;
  background: black;
`;

const App = () => {
  const [path, setPath] = useState({
    dir: '', files: [], selectedFile: null
  });
  console.debug(path)
  if (!path.dir) {
    fs.readdir(os.homedir(), { withFileTypes: true }, (err, files) => {
      if (err) { console.log(err); return; }
      setPath({
        dir: os.homedir(), files,
        selectedFile: null
      });
    })
  };

  return (
    <SplitScreen>
      <Left><Explorer path={path} /></Left>
      <Main>hey</Main>
    </SplitScreen>
  );
}
  

export default App;