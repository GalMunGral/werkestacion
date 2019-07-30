import React, { useState } from 'react';

const Explorer = ({ path: { dir, files, selectedFile } }) => (
  <ul>
    {files.map((f, i) => (
      <li key={i}style={{
        color: f === selectedFile ? 'red' : 'black'
      }}>{f.name}</li>
    ))}
  </ul>
);

export default Explorer;