const fs = require('fs');
const chalk = require('chalk');

const { execSync } = require('child_process');

const { inputPath, outputPath, tempPath, saveM3u8File, outputFileType } = require('./config');

// 判断临时文件夹是否存在，如果不存在则进行创建
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath);
}

// 读取m3u8的元数据
const m3u8Files = fs.readdirSync(inputPath).filter(value => value.endsWith('.m3u8'));

const fileNameReg = /[^\u4e00-\u9fa5\w.-]/g;
/**
 * 将文件复制到临时文件夹，并进行重新命名
 * 删除文件名中除汉字、英文字母和数字的字符
 */
m3u8Files.forEach(value => {
  const newFileName = value.replace(fileNameReg, '');

  fs.copyFileSync(`${inputPath}/${value}`, `${tempPath}/${newFileName}`);
});

// 读取重命名完成的临时文件
let tempM3u8Files = fs.readdirSync(tempPath);

// 调整当前工作目录为临时文件夹
process.chdir(tempPath);

const keyReg = /URI="(.*)"/;

/**
 * 进行密钥路径修正
 */
tempM3u8Files.forEach(value => {
  // 获取当前m3u8文件
  const m3u8File = fs.readFileSync(`${tempPath}/${value}`, 'utf8');

  // 判断是否加密
  const isEncrypted = m3u8File.match(keyReg);

  if (isEncrypted) {
    // 加密：

    // 处理密钥的路径
    const keyUri = m3u8File.match(keyReg)[1].split('/');

    const keyUriLength = keyUri.length;

    const newKeyUri = `${inputPath}/${keyUri.slice(keyUriLength - 2).join('/')}`;

    const newM3u8File = m3u8File.replace(keyReg, `URI="${newKeyUri}"`);

    const tempFile = `${tempPath}/${value}`;

    fs.writeFileSync(tempFile, newM3u8File, { flag: 'r+' });
  }
});

const pathReg = /\/(.*)\/\/?(\w*)\/(\w*\s)/g;

/**
 * 进行元数据路径修正
 */
tempM3u8Files.forEach((value, index) => {
  const m3u8File = fs.readFileSync(`${tempPath}/${value}`, 'utf8');

  if (index === 1) {
    console.log('value:', value);

    const basePath = m3u8File.match(pathReg);
    console.log('basePath:', basePath);
  }

  /*
  const pathArr = basePath.split('/');
  console.log('pathArr:', pathArr);

  const oldPath =
    '/' +
    pathArr
      .slice(0, pathArr.length - 2)
      .filter(value => value)
      .join('/');
  console.log('oldPath:', oldPath);
*/

  // const newM3u8File = m3u8File.replace(/111/, '');

  // const tempFile = `${tempPath}/${value}`;

  // fs.writeFileSync(tempFile, newM3u8File, { flag: 'r+' });
  // let newM3u8File = m3u8File.replace();
});
/*
tempM3u8Files.forEach(value => {
  console.log(`${chalk.blueBright('正在转换中：')}${value}`);

  const outputFilePath = `${outputPath}/${value.slice(0, value.length - 5)}.${outputFileType}`;

  execSync(`ffmpeg -allowed_extensions ALL -i ${value} ${outputFilePath}`);

  console.log(`${chalk.greenBright('文件转换完成：')}${value}`);
});
*/
