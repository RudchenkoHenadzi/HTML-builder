const fs = require('fs');

const directoryPath = 'files';
const directoryPathCopy = 'copy-files';

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
