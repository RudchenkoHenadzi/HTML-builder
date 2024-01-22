const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeStream = fs.createWriteStream('text.txt', 'utf-8');

const finishProgram = () => {
  rl.write('Ну… вот и все…');
  rl.close();
};

rl.write('Пожалуйста… нарисуй мне барашка! \n');
rl.on('line', (data) => {
  data.toLowerCase() === 'exit'
    ? finishProgram()
    : writeStream.write(data + '\n');
});

rl.on('SIGINT', () => {
  finishProgram();
});
