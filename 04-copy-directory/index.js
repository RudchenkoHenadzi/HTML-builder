const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'files');
const directoryPathCopy = path.join(__dirname, 'copy-files');

fs.readdir(directoryPath, (err, files) => {
  fs.mkdir(directoryPathCopy, { recursive: true }, (err) => {
    if (err) console.error(err);
    console.log(`Директория ${directoryPathCopy} успешно создана`);
  });

  files.forEach((file) => {
    fs.copyFile(
      `${directoryPath}/${file}`,
      `${directoryPathCopy}/${file}`,
      (err) => {
        if (err) console.error(err);
        console.log(`${file} скопирован`);
      },
    );
  });
});
