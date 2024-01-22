const fs = require('fs');
const path = require('path');

const styleDirectory = 'styles';
const writeStream = fs.createWriteStream('project-dist/bundle.css', {
  encoding: 'utf8',
});
fs.readdir(styleDirectory, { withFileTypes: true }, (err, files) => {
  if (err) console.log('Ошибка при чтении директории', err);
  files.forEach((file) => {
    if (path.parse(file.name).ext === '.css' && !file.isDirectory()) {
      const readStream = fs.createReadStream(`${styleDirectory}/${file.name}`, {
        encoding: 'utf8',
      });

      readStream.on('data', (chunk) => {
        writeStream.write(chunk);
      });

      readStream.on('end', () => {
        console.log('Чтение завершено');
        writeStream.end(() => {
          console.log('Запись файла завершена');
        });
      });

      readStream.on('error', (err) => {
        console.log('Ошибка при чтрении файла:', err);
      });
    }
  });

  writeStream.on('error', (err) => {
    console.log('Ошибка при записи файла:', err);
  });

  writeStream.on('finish', (err) => {
    if (err) console.log(err);
    console.log('Запись всех файлов завершена');
  });
});
