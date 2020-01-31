const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const { execSync } = require('child_process');

const { sep } = path;

const { inputPath, outputPath, tempPath, saveM3u8File, outputFileType } = require('./config');

if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath);
}

const m3u8Files = fs.readdirSync(inputPath).filter(value => value.endsWith('.m3u8'));

m3u8Files.forEach(value => {
  const m3u8File = fs.readFileSync(inputPath + sep + value, 'utf8');

  const keyUri = m3u8File.match(/URI="(.*)"/)[1].split('/');
  const newKeyUri = `${inputPath}/${keyUri.slice(keyUri.length - 2).join('/')}`;

  const newM3u8File = m3u8File.replace(/URI="(.*)"/, `URI="${newKeyUri}"`).replace(/\/.*\/\//g, `${inputPath}/`);

  const tempFilePath = `${tempPath}/${value}`;

  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath);
  }

  fs.writeFileSync(tempFilePath, newM3u8File);

  console.log(`${chalk.blueBright('正在转换中：')}${value}`);

  process.chdir(tempPath);

  const outputFilePath = `${outputPath}/${value.slice(0, value.length - 5)}.${outputFileType}`;

  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath);
  }

  execSync(`ffmpeg -allowed_extensions ALL -i ${value} ${outputFilePath}`);

  process.chdir(__dirname);

  console.log(`${chalk.greenBright('文件转换完成：')}${value}`);
});

const deleteFolderRecursive = path => {
  if (!fs.accessSync(path)) {
    fs.readdirSync(path).forEach(file => {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

if (!saveM3u8File) {
  deleteFolderRecursive(tempPath);
}
