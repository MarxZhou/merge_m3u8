const fs = require('fs');

const { deleteFolderRecursive, Log } = require('./utils');

const { execSync } = require('child_process');

const { inputPath, outputPath, tempPath, saveM3u8File, outputFileType } = require('./config');

// 判断临时文件夹是否存在，如果不存在则进行创建
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath);
  Log.greenBright('临时文件夹创建完成：', tempPath);
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
Log.greenBright('临时文件创建完成，文件名中的除中文、英文、数字、下划线、点和中横线外的字符都会被删除');

// 读取重命名完成的临时文件
let tempM3u8Files = fs.readdirSync(tempPath);

// 调整当前工作目录为临时文件夹
process.chdir(tempPath);

const keyReg = /URI="(.*)\/(\w*)\/(\w*)"/;

/**
 * 进行密钥路径修正
 */
tempM3u8Files.forEach(value => {
  // 获取当前m3u8文件
  const m3u8File = fs.readFileSync(`${tempPath}/${value}`, 'utf8');

  // 判断是否加密
  const isEncrypted = m3u8File.match(keyReg);

  if (isEncrypted) {
    // 已加密

    // 处理密钥的路径
    const keyUri = isEncrypted[1];

    const newM3u8File = m3u8File.replace(keyUri, inputPath);

    const tempFile = `${tempPath}/${value}`;

    fs.writeFileSync(tempFile, newM3u8File);

    Log.greenBright('文件密钥信息修正完成：', value);
  } else {
    // 未加密

    Log.greenBright('文件未加密：', value);
  }
});

const pathReg = /(\/.*\w)(\/\/?)(\w*)\/(\w*\s)/;

/**
 * 进行元数据路径修正
 */
tempM3u8Files.forEach(value => {
  Log.blueBright('正在处理m3u8文件元数据：', value);
  try {
    const m3u8File = fs.readFileSync(`${tempPath}/${value}`, 'utf8');

    const basePath = m3u8File.match(pathReg);

    const path = basePath[1];

    const errSign = basePath[2] === '//' ? '//' : null;

    const temp = m3u8File.replace(new RegExp(path, 'g'), inputPath);

    let newM3u8File = temp;
    if (errSign) {
      newM3u8File = temp.replace(new RegExp(errSign, 'g'), '/');
    }

    const tempFile = `${tempPath}/${value}`;

    fs.writeFileSync(tempFile, newM3u8File);
    Log.greenBright('m3u8文件元数据修正完成：', value);
  } catch (e) {
    Log.redBright('m3u8文件元数据出现了错误：', `${value}：${JSON.stringify(e)}`);
  }
});

tempM3u8Files.forEach(value => {
  Log.blueBright('正在转换中：', value);

  const outputFilePath = `${outputPath}/${value.slice(0, value.length - 5)}.${outputFileType}`;

  try {
    execSync(`ffmpeg -allowed_extensions ALL -i ${value} ${outputFilePath} -loglevel warning`);
    Log.blueBright('文件转换完成：', value);
  } catch (e) {
    Log.redBright('文件转换出现了错误：', `${value}：${JSON.stringify(e)}`);
  }
});

if (!saveM3u8File) {
  deleteFolderRecursive(tempPath);
  Log.greenBright('临时文件夹删除完成');
}
