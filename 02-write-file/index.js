const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const route = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(route, 'utf-8');

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
