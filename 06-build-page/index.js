const fs = require('fs');
const path = require('path');

const pathTemplate = path.join(__dirname, 'template.html');
const pathAssets = path.join(__dirname, 'assets');
const pathProjectDist = path.join(__dirname, 'project-dist');
const pathDistAssets = path.join(__dirname, 'project-dist/assets');

let indexHTML;

const readStream = fs.createReadStream(pathTemplate, {
  encoding: 'utf8',
});

readStream.on('data', (chunk) => {
  indexHTML = chunk;
});

readStream.on('end', () => {
  fs.mkdir(pathProjectDist, { recursive: true }, (err) => {
    if (err) console.log(err);
  });
  buildingHtml();
  buildingStyle();
  copyFiles(pathAssets, pathDistAssets);
});

readStream.on('error', (err) => {
  if (err) console.log(`Ошибка чтения ${pathTemplate} файла`, err);
});

const buildingHtml = () => {
  const componentsTemplates = path.join(__dirname, 'components');
  fs.readdir(componentsTemplates, (err, files) => {
    if (err) console.log(err);

    files.forEach((file) => {
      const readStream = fs.createReadStream(`${componentsTemplates}/${file}`, {
        encoding: 'utf8',
      });

      readStream.on('data', (chunk) => {
        indexHTML = indexHTML.replace(`{{${path.parse(file).name}}}`, chunk);
      });

      readStream.on('end', () => {
        const writeStream = fs.createWriteStream(
          path.join(__dirname, 'project-dist/index.html'),
          {
            encoding: 'utf8',
          },
        );

        writeStream.write(indexHTML);
      });
    });
  });
};

const buildingStyle = () => {
  const writeStream = fs.createWriteStream(
    path.join(__dirname, 'project-dist/style.css'),
    {
      encoding: 'utf8',
    },
  );
  fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      const readStream = fs.createReadStream(
        path.join(__dirname, `styles/${file}`),
        {
          encoding: 'utf8',
        },
      );
      readStream.on('data', (chunk) => {
        writeStream.write(chunk);
      });
    });
  });
};

const copyFiles = (source, destination) => {
  fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) console.log(err);
  });
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      const sourcePath = path.join(source, file.name);
      const destinationPath = path.join(destination, file.name);

      if (file.isDirectory()) {
        copyFiles(sourcePath, destinationPath);
      } else {
        fs.copyFile(sourcePath, destinationPath, (err) => {
          if (err) console.log('Ошибка при копировании файлов', err);
        });
      }
    });
  });
};
