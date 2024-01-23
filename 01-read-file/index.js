const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('end', () => {});

readStream.on('error', (err) => {
  console.error(`Ошибка при чтении файла: ${err.message}`);
});
