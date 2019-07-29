const fs = require('fs');
fs.readdir(__dirname, (err, files) => {
  document.write(files.join(' '));
});
