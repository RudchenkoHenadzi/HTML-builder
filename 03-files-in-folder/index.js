const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, 'secret-folder');

fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Ошибка при чтении директории:', err);
    return;
  }

  files.forEach((file) => {
    if (!file.isDirectory()) {
      const filePath = path.join(directoryPath, file.name);
      fs.stat(filePath, (err, stats) => {
        console.log(
          `${path.parse(file.name).name} - ${path
            .parse(file.name)
            .ext.substring(1)} - ${(stats.size / 1024).toFixed(1)}KB`,
        );
      });
    }
  });
});
