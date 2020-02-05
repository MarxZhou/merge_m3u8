const fs = require('fs');
const chalk = require('chalk');
const chance = require('chance');

const { execSync } = require('child_process');

const { inputPath, outputPath, tempPath, saveM3u8File, outputFileType } = require('./config');

if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath);
}

const m3u8Files = fs.readdirSync(inputPath).filter(value => value.endsWith('.m3u8'));

m3u8Files.forEach(value => {
  const newFileName = value.replace(/[^\u4e00-\u9fa5A-Za-z0-9_.]/, '');

  fs.copyFileSync(`${inputPath}/${value}`, `${tempPath}/${newFileName}`);
});

const tempM3u8Files = fs.readdirSync(tempPath).filter(value => value.endsWith('.m3u8'));

tempM3u8Files.forEach(value => {
  const m3u8File = fs.readFileSync(`${inputPath}/${value}`, 'utf8');

  let keyUri = '';
  let newKeyUri = '';
  let newM3u8File;

  const guid = value || chance.guid();

  const isEncrypted = m3u8File.match(/URI="(.*)"/);

  if (isEncrypted) {
    keyUri = m3u8File.match(/URI="(.*)"/)[1].split('/');
    newKeyUri = `${inputPath}/${keyUri.slice(keyUri.length - 2).join('/')}`;
    newM3u8File = m3u8File.replace(/URI="(.*)"/, `URI="${newKeyUri}"`).replace(/\/.*\/\//g, `${inputPath}/`);
  } else {
    newM3u8File = m3u8File.replace(/\/.*\/\//g, `${inputPath}/`);
  }

  const tempFile = `${tempPath}/${value}`;

  fs.writeFileSync(tempFile, newM3u8File, { flag: 'r+' });

  console.log(`${chalk.blueBright('正在转换中：')}${value}`);

  const outputFilePath = `${outputPath}/${value.slice(0, value.length - 5) || guid}.${outputFileType}`;

  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath);
  }

  process.chdir(tempPath);

  execSync(`ffmpeg -allowed_extensions ALL -i ${value} ${outputFilePath}`);

  process.chdir(__dirname);

  console.log(`${chalk.greenBright('文件转换完成：')}${guid}`);
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
