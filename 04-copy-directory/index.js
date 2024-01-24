const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'files');
const directoryPathCopy = path.join(__dirname, 'copy-files');

const copyFiles = () => {
  fs.readdir(directoryPath, (err, files) => {
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
};

const clearDirectory = () => {
  fs.readdir(directoryPathCopy, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      fs.unlink(path.join(directoryPathCopy, file), (err) => {
        if (err) console.log(err);
      });
    });
  });
};

fs.readdir(directoryPath, (err, files) => {
  fs.mkdir(directoryPathCopy, { recursive: true }, (err) => {
    if (err) console.error(err);
    console.log(`Директория ${directoryPathCopy} успешно создана`);
  });

  clearDirectory();
  copyFiles();
});
